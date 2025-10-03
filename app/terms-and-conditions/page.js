"use client";
import P from "@/components/ui/P";
import SharedHero from "@/components/ui/SharedHero";
import Title from "@/components/ui/Title";

const TermsPage = () => {
  return (
    <>
      <SharedHero
        eyebrow="Terms & Conditions"
        title="The Dope Breakthrough – Divining Our Perfect Eternity"
        description=""
        bgImage="/imgs/home-sec3.jpeg"
      />

      <section className="py-28">
        <div className="container">
          <div className="mx-auto max-w-5xl rounded-2xl shadow-md bg-white p-10 pt-12 border border-neutral-200 relative">
            <div className="absolute top-1 right-1 rounded-xl text-neutral-700 bg-neutral-100 border border-neutral-200 text-sm px-3 py-0.5">
              <strong>Effective:</strong> January 1, 2025.
            </div>
            <div className="space-y-5">
              <div>
                <Title once={true} as="h3">
                  Thank you for supporting THEO WW INC Ministries!
                </Title>
              </div>
              <div className="space-y-3 *:text-base">
                <P>
                  The DBT Franchise offers products and services provided by
                  THEO WW INC Ministries., and its subsidiaries through the
                  assets of Office of CPOYI’s Sovereign Wealth Fund (CSWF).
                  These Terms of Use ("Terms") govern your use of our website,
                  apps, and other products and services ("Services"). As some of
                  our Services may be software that is downloaded to your
                  computer, phone, tablet, or other device, you agree that we
                  may automatically update this software, and that these Terms
                  will apply to such updates. Please read these Terms carefully,
                  and if you have any questions, requests for information, or
                  complaints, feel free to email:{" "}
                  <a
                    href="mailto:contact@theowwinc.com"
                    className="underline text-primary-700 hover:text-primary-600 transition-colors duration-300"
                  >
                    contact@theowwinc.com
                  </a>
                  . By purchasing a product, you agree to be bound by these
                  Terms, including the policies referenced in these Terms. By
                  using our Services, you agree to be bound by these Terms,
                  including the policies referenced in these Terms.
                </P>
                <P className="font-semibold">
                  THESE TERMS INCLUDE AN ARBITRATION AGREEMENT, JURY TRIAL
                  WAIVER AND CLASS ACTION WAIVER THAT APPLY TO ALL CLAIMS
                  BROUGHT AGAINST THEO WW INC. PLEASE READ THEM CAREFULLY AS
                  THEY AFFECT YOUR LEGAL RIGHTS: (1) YOU WILL ONLY BE PERMITTED
                  TO PURSUE DISPUTES OR CLAIMS AND SEEK RELIEF AGAINST US ON AN
                  INDIVIDUAL BASIS, NOT AS A PLAINTIFF OR CLASS MEMBER IN ANY
                  CLASS OR REPRESENTATIVE ACTION OR PROCEEDING AND YOU WAIVE
                  YOUR RIGHT TO PARTICIPATE IN A CLASS ACTION LAWSUIT OR
                  CLASS-WIDE ARBITRATION; AND (2) YOU ARE WAIVING YOUR RIGHT TO
                  PURSUE DISPUTES OR CLAIMS AND SEEK RELIEF IN A COURT OF LAW
                  AND TO HAVE A JURY TRIAL. THE TERMS OF THE ARBITRATION
                  AGREEMENT SHALL NOT APPLY IF UNENFORCEABLE UNDER THE LAWS OF
                  THE COUNTRY IN WHICH YOU RESIDE.
                </P>
              </div>
              <div className="mt-10">
                <Title once={true} as="h3">
                  <span className="text-neutral-500">
                    1. Purchasing A DBT FRANCHISE Product
                  </span>
                </Title>
              </div>
              <div className="grid grid-cols-1 gap-3">
                <Title once={true} as="h4">
                  Who May Use Our Services
                </Title>
                <div className="pl-4 space-y-2 *:text-base">
                  <P className="font-semibold">
                    Any purchase by anyone under the age of 13 is strictly
                    prohibited.
                  </P>
                  <P>Additionally, you may purchase a product only if you:</P>
                  <ul className="list-disc list-inside">
                    <li>
                      comply with these Terms, all applicable laws, and our
                      policies (including the Acceptable Use Policy, Honor Code,
                      and any other policies that may be applicable from time to
                      time (“Policies”)); and
                    </li>
                    <li>
                      are over the age at which you can provide consent to data
                      processing under the laws of your country. Certain regions
                      and Content Offerings may have additional requirements
                      and/or different age restrictions.
                    </li>
                  </ul>
                  <P>
                    Any violation of our Terms, applicable laws, or Policies may
                    result in your access to all or part of the Services being
                    suspended, disabled, or terminated.
                  </P>
                  <P>
                    When you purchase your DBT Franchise product you must
                    provide us with accurate and complete information, and you
                    agree to update your information to keep it accurate and
                    complete.
                  </P>
                </div>
                <Title once={true} as="h4">
                  Our License to You
                </Title>
                <P className="text-base">
                  Subject to these Terms and our Policies, we grant you a
                  limited, personal, non-exclusive, non-transferable, and
                  revocable license right to use our product. The rights granted
                  herein are only for your personal, non-commercial use, unless
                  you obtain our written permission otherwise. You also agree
                  that you will create, access, and/or use only one user/license
                  account, unless expressly permitted by THEO WW INC, and you
                  will not share access to your account or access information
                  for your account with any third party. Using our Services does
                  not give you ownership of or any intellectual property rights
                  in our Services or the content you access.
                </P>
                <Title once={true} as="h4">
                  Commercial Use
                </Title>
                <P className="text-base">
                  Any use of our product(s) for commercial purposes is strictly
                  prohibited. Any commercial use must be subject to a separate
                  agreement with THEO WW INC Ministries. If you are an
                  organization already using our ministry services, separate
                  terms apply. These terms do not govern the relationship
                  between your organization and THEO WW INC Ministries.
                </P>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default TermsPage;
