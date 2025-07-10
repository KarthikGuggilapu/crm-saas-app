"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Register } from "@/components/auth/register";
import { createClient } from "@/lib/supabase/client";
import { toast } from "@/hooks/use-toast";
import { Input } from "@/components/ui/input";

export default function RegisterPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const inviteToken = searchParams.get("invite");
  const [invite, setInvite] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [companyName, setCompanyName] = useState("");

  useEffect(() => {
    if (inviteToken) {
      const fetchInvite = async () => {
        setLoading(true);
        const supabase = createClient();
        const { data, error } = await supabase
          .from("invites")
          .select("*")
          .eq("token", inviteToken)
          .eq("status", "pending")
          .single();
        setInvite(data);
        setLoading(false);
      };
      fetchInvite();
    }
  }, [inviteToken]);

  useEffect(() => {
    if (invite?.company) {
      const fetchCompanyName = async () => {
        const supabase = createClient();
        const { data: company } = await supabase
          .from("companies")
          .select("name")
          .eq("id", invite.company)
          .single();
        setCompanyName(company?.name || "");
      };
      fetchCompanyName();
    }
  }, [invite?.company]);

  const handleRegister = async (data: { firstName: string; lastName: string; email: string; password: string; company: string; }) => {
    const supabase = createClient();
    let email = data.email;
    let company = data.company;
    let role = "member";

    // If invite, override with invite data
    if (invite) {
      email = invite.email;
      company = invite.company;
      role = invite.role || "member";
    }

    const { error, data: signUpData } = await supabase.auth.signUp({
      email,
      password: data.password,
      options: {
        data: {
          first_name: data.firstName,
          last_name: data.lastName,
          company,
          role,
        },
      },
    });

    if (error) {
      toast({
        title: "Registration Error",
        description: error.message,
        variant: "destructive",
      });
      return;
    }

    // If invite, mark as accepted
    if (invite) {
      await supabase.from("invites").update({ status: "accepted" }).eq("id", invite.id);
    }

    toast({
      title: "Registration Successful",
      description: "Account created! Confirm your email...",
    });

    setTimeout(() => {
      router.push("/login");
    }, 1500);
  };

  if (loading) return <div>Loading...</div>;
  if (inviteToken && !invite) return <div>Invalid or expired invite.</div>;

  return (
    <Register
      onRegister={handleRegister}
      onSwitchToLogin={() => router.push("/login")}
      onBackToLanding={() => router.push("/")}
      // Optionally, pass pre-filled values:
      prefillEmail={invite?.email}
      prefillCompany={companyName}
      prefillRole={invite?.role}
      disableEmail={!!invite}
      disableCompany={!!invite}
    />
  );
}
