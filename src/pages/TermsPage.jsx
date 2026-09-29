import usePageMeta from '../hooks/usePageMeta'
import PageHero from '../components/PageHero'

/*
  Body copy is verbatim from the live Email Agency page
  (emailagency.com/terms-conditions/), InsuranceLogic's parent company, per
  the site owner's instruction: "Terms & Conditions for Email Marketing
  Services" and "Leads and Data Terms & Conditions". Both refer to "Email
  Agency". Only the page title/description below are InsuranceLogic-specific.
  Flag for legal review before treating it as InsuranceLogic's own terms.
*/
export default function TermsPage() {
  usePageMeta(
    "Terms & Conditions | InsuranceLogic",
    "The terms and conditions governing marketing services and leads and data services from InsuranceLogic's parent company, Email Agency."
  )

  return (
    <div>
      <PageHero minHeight="32vh">
        <span className="section-label">Legal</span>
        <h1 className="page-title">Terms &amp; Conditions</h1>
      </PageHero>

      <section className="section" style={{ paddingTop: 48 }}>
        <div className="container">
          <div className="legal-prose">

            <h2>Terms &amp; Conditions for Email Marketing Services</h2>

            <h3>1. Copy Approval</h3>
            <p>
              Advertiser must deliver to Email Agency the content of the advertisement. Advertiser is contracting Email
              Agency to broadcast (the copy) not less than 3 days prior to the desired email broadcast date. All Copy shall
              be subject to Email Agency&rsquo;s approval. Email Agency reserves the right to reject any Copy that
              advertises or promotes any product or service involving illegal activity, illegal products, illegal product
              paraphernalia, sexual paraphernalia, adult films or other media, gambling weapons, illicit activities, chain
              letters, pyramid fund raising or similar types of material. By reserving this right, Email Agency shall not
              be legally obligated to any failure to advise advertiser of the nature of any such Copy.
            </p>

            <h3>2. Details of Broadcast</h3>
            <p>
              The email messages broadcast by Email Agency shall identify the source of the recipients data collection and
              shall contain an opt-out feature that allows the recipient to communicate electronically and by direct mail
              his or her desire to be removed from the Email Agency (or affiliate) database.
            </p>

            <h3>3. Hardware, Software and Database List</h3>
            <p>
              Email Agency (or affiliate) shall obtain and maintain the computer hardware and software necessary to
              perform its obligations under these Terms and Conditions. Such hardware and software shall not be dedicated
              hardware or software. Nothing in these Terms and Conditions shall grant any right, title or interest in or
              to the Email Agency (or affiliate) database, hardware or software.
            </p>

            <h3>4. Payment</h3>
            <p>
              Advertiser or Client shall pay in full the fees charged by Email Agency in the insertion order or invoice
              based on the terms provided. You can view the terms on each actual invoice. Any late payments will accrue
              interest equal to two percent (2%) per month. All accounts not paid within Ninety (90) days of the invoice
              due date may be remanded to a collection agency and charged an additional Thirty Three (33%) percent on top
              of the outstanding balance, or the maximum permissible by law.
            </p>

            <h3>5. Cancellation</h3>
            <p>
              Advertiser shall pay a 15% cancellation fee upon any cancelled orders that have already been agreed upon
              with a signed Insertion Order.
            </p>

            <h3>6. Indemnification</h3>
            <p>
              Advertiser shall indemnify, defend and hold harmless Email Agency against all third party claims, actions
              and liabilities (including all reasonable costs, expenses and attorney fees) arising from or in connection
              with (a) Advertisers products(s), services or the content of the Advertisers copy, including without
              limitation any claim alleging any violations of any third party&rsquo;s intellectual property rights: or (b)
              Advertisers breach of any of its obligations, representations or warranties under these Terms and
              Conditions. Email Agency shall promptly notify Advertiser in writing of allsuch claims and shall accommodate
              Advertisers reasonable requests for cooperation and information.
            </p>

            <h3>7. Warranties</h3>
            <p>
              Email Agency makes no warranty whatsoever as to the email advertisements, expressed or implied. Advertiser
              acknowledges and agrees that there are no guarantees of success on email marketing campaigns. Like any form
              of traditional advertisement, email marketing has its successes and failures due to marketing conditions and
              other factors. Email Agency cannot be held liable for unsuccessful email marketing campaigns outside of its
              immediate control. Client agrees that Email Agency does not guarantee any email marketing success or
              results and holds Email Agency harmless and will indemnify from any consequences of the marketing campaign.
            </p>

            <h3>8. Limitation of Liability</h3>
            <p>
              In no event shall Email Agency be liable for indirect, special, exemplary, consequential, incidental or
              punitive loss, damage or expense (including lost profits). The limit of Email Agency&rsquo;s liability
              (whether in contract, tort, negligence, strict liability in tort or by statute or otherwise) for any and all
              claims related to these terms and conditions shall not in the aggregate exceed the fees paid to Email
              Agency under the invoice.
            </p>

            <h3>9. Force Majeure</h3>
            <p>
              Neither party shall be liable for delays or nonperformance of these Terms and Conditions if any delay or
              nonperformance was caused by: (a) act of God, act of war, strike, fire, natural disaster, or accident: (b)
              lack of availability of materials, fuel, utilities: or ( c ) any other cause beyond such party&rsquo;s
              control.
            </p>

            <h3>10. Assignment</h3>
            <p>
              Neither party may assign its rights or obligations under these Terms and Conditions without the prior
              written consent of the other party.
            </p>

            <h3>11. Relationship of Parties</h3>
            <p>
              The parties are independent contracting entities, and there is no partnership or agency relationship
              between them.
            </p>

            <h3>12. Entire Agreement</h3>
            <p>
              Except as expressly modified or supplemented by a writing executed by both parties, the Terms and
              Conditions described herein and the invoice specifically incorporating these Terms and Conditions are the
              only representations, warranties, and understanding between the parties with respect to the products and/or
              services described herein. In the event of any conflict between these Terms and Conditions and any other
              document (including without limitation, the Invoice and any Advertiser invoice, insertion order or purchase
              order), the provisions of these Terms and Conditions shall govern. The waiver of any right, breach, or
              default shall not constitute a waiver of any other right or any subsequent breach or default.
            </p>

            <h3>13. Disputes</h3>
            <p>
              This agreement is entered into in the County of Broward, State of Florida, and that any and all legal
              actions taken with regard to or pursuant to this agreement shall be filed in the County of Palm Beach,
              State of Florida.
            </p>

            <h3>14. Severability</h3>
            <p>
              Should any provisions of these Terms and Conditions be found invalid or unenforceable, all such provisions
              are to be enforced to the maximum extent permitted by law, and beyond such extent shall be deemed severed
              from these Terms and Conditions without affecting the validity or enforceability of any other provision.
            </p>

            <h3>15. Headings</h3>
            <p>
              The headings of these Terms and Conditions are for convenience only and shall not be used to construe the
              meaning of this agreement.
            </p>

            <h2>Leads and Data Terms &amp; Conditions</h2>
            <p>
              The present Terms and Conditions (the &ldquo;Agreement&rdquo;) are entered into, as of the date of your
              execution of this Agreement, by and between you (&ldquo;you&rdquo;, &ldquo;your&rdquo;,
              &ldquo;yours&rdquo;, or &ldquo;Client&rdquo;) and Email Agency, Inc. (&ldquo;we&rdquo;, &ldquo;us&rdquo;,
              &ldquo;our&rdquo;, or the &ldquo;Company&rdquo;). The Invoice above constitutes an integral part of the
              Agreement. The Agreement describes what (i) you are legally entitled to expect from us within the framework
              of the license of the right to use digital data (&ldquo;Data&rdquo;) which is granted to you by us under
              the present Agreement, as well as (ii) your obligations and responsibility are within the framework of such
              license granted to you by us hereunder. &ldquo;You&rdquo; shall mean either you as an individual, a
              business, a government entity, or any other legal entity on which behalf you are accepting this Agreement.
              You hereby represent that you are 18 years old or older and that you are authorized to enter into this
              Agreement. The Company and the Client are hereinafter referred to together as the &ldquo;Parties&rdquo; and
              individually as a &ldquo;Party&rdquo;. By executing this Agreement, you acknowledge that you have read,
              understood and agreed to the following terms and conditions:
            </p>

            <h3>1. Payment Terms</h3>
            <p>
              1.1 In consideration of the license (granted by the Company to you hereunder) of the right to use the Data,
              you shall pay a licensing fee (&ldquo;Fee&rdquo;) to the Company in accordance with the present Agreement.
            </p>
            <p>
              1.2 The Parties understand and agree that the Fee, assessed by the Company against the Client&rsquo;s
              credit/debit card or paid by the Client to the Company under the present Agreement, are non-refundable.
            </p>
            <p>
              1.3 The Client understands and agrees that the Client will be charged (by the Company) a late payment
              interest at the rate of 2% of the Fee amount a month if the Client fails to pay such Fee on the due date.
            </p>
            <p>
              1.4 Should the Fee, for any reason, remain unpaid, the Company reserves the right, at its sole discretion,
              to terminate the present Agreement with or without a written notice given to you.
            </p>

            <h3>2. Cancellation</h3>
            <p>
              The Client shall pay the Company a cancellation fee in an amount of 15% of the Fee should the Client cancel
              any of the orders after executing this Agreement.
            </p>

            <h3>3. Credit/Debit Payments and Disputes</h3>
            <p>
              3.1 Credit/Debit Card Authorization. Should you decide to pay us the Fee with your credit/debit card by
              providing us with your credit/debit card information, the present section 3 of the Agreement shall apply to
              you. By agreeing to the terms and conditions of this Agreement you authorize the Company to assess/charge
              the Fee against your credit/debit card provided by you hereunder. You undertake to provide the Company with
              complete and accurate billing and contact information and to keep such information up-to-date.
            </p>
            <p>
              3.2 Chargeback Prevention and Billing Disputes. The Parties hereby acknowledge, understand and agree that
              chargeback&rsquo;s generally constitute a remedy used by any client of the Company in regards to fraudulent
              transactions, or when there is a violation/breach by the Company of any of the provisions of the agreement
              entered into between any such client and the Company.
            </p>
            <p>
              Thus, considering the foregoing, except for reasons of fraudulent use by the Company of the Client&rsquo;s
              credit/debit card information or of a material violation/breach by the Company of the present Agreement,
              the Client hereby agrees and undertakes not to dispute any Fee/charge assessed by the Company against the
              Client&rsquo;s credit/debit card. Should the Client have any questions or objections regarding any
              Fee/charge assessed by the Company against the Client&rsquo;s credit/debit card, the Client shall
              immediately contact the Company and then both the Company and the Client shall try to solve/settle this
              issue in the most amicable and transparent manner possible. The Company shall then provide the Client with
              good explanations within a reasonable amount of time.
            </p>

            <h3>4. Ownership</h3>
            <p>
              4.1 The term &ldquo;Company Property&rdquo; means the Data, documentation, files, information, software,
              programs, systems, website located at http://www.emailagency.com/, content, graphics, page layouts, site
              designs, user interfaces utilized or provided by the Company and/or the Company&rsquo;s licensors, work
              product produced by the Company and/or the Company&rsquo;s licensors, and derivate works of any of the
              foregoing, including, without limitation, any HTML programming performed as part of providing you with the
              Data and any other special programs, functionalities, interfaces and other work product, ideas, concepts or
              techniques which the Company may develop, use or rely upon in providing the Data to you.
            </p>
            <p>
              4.2 All Company Property shall be and shall remain the sole and exclusive property of the Company and/or
              the Company&rsquo;s licensors.
            </p>
            <p>
              4.3 The Company and/or the Company&rsquo;s licensors shall be the sole and exclusive owners of all patents,
              copyrights, trademarks, trade secrets and other intellectual property rights in and to the Company
              Property.
            </p>

            <h3>5. License</h3>
            <p>
              Upon your execution of the present Agreement and your payment of the Fee to the Company, you are granted a
              non-transferable, non-exclusive, non-assignable, non-sub licensable and perpetual license (unless stated
              otherwise in the Invoice) of the right to use the Data solely for direct marketing, market research and
              customer prospecting purposes, and in strict compliance with the terms and conditions of the Agreement.
            </p>

            <h3>6. Limitations on Use</h3>
            <p>
              6.1 Unless specifically authorized in advance and in writing by the Company, you may not share, sell,
              transfer or otherwise make the Data available to any third party (individual or entity) and you undertake
              to use your best efforts to prevent the misuse or unauthorized use of the Data by any third party
              (individual or entity).
            </p>
            <p>
              6.2 You may not name or refer to the Company or to your use of the Data in any of your advertisements or
              promotional or marketing materials.
            </p>
            <p>6.3 You shall not use the Data for any unlawful, unauthorized, fraudulent or malicious purposes.</p>

            <h3>7. Your Responsibilities, Use of Email Data, Review and Audit by the Company</h3>
            <p>
              7.1 Your use of the Data shall comply with all applicable federal, state, local and foreign laws, statutes,
              rules and regulations (&ldquo;Laws&rdquo;), including Laws regarding telemarketing, email and facsimile
              marketing, customer solicitation and all applicable guidelines of the Direct Marketing Association
              (&ldquo;DMA&rdquo;). If you are not a member of the DMA, you shall use your best efforts to comply with the
              DMA&rsquo;s guidelines.
            </p>
            <p>
              7.2 Your use of any Data shall comply with all applicable Laws, including the CAN-SPAM Act, COPPA, and any
              State Registry laws.
            </p>
            <p>
              7.3 The Company reserves the right to review your use of the Data in order to ensure your compliance with
              this Agreement, but any failure of the Company to review such use will not constitute acceptance of such
              use or waive any of Company&rsquo;s rights hereunder or limit any of your obligations with respect to the
              Data. At any time, by providing you with a 3-day prior written notice, the Company may audit your records
              to determine whether you are in compliance with this Agreement and you shall make available to the Company
              or its representatives all records necessary in order to conduct such an audit.
            </p>

            <h3>8. Client&rsquo;s Representations</h3>
            <p>
              The Client represents and warrants that, when using the Data, the Client will not (a) invade the right of
              privacy of any third party, (b) spread any libelous, obscene, indecent or otherwise unlawful material, or
              (c) infringe upon the rights of any third party by committing (but not limited to) any act of (i)
              infringement upon or misappropriation of any copyright, patent, trademark, trade secret, or other
              intellectual property right, and (ii) false advertising, unfair competition, defamation, violation of any
              anti-discriminatory law/regulation or of any other right of any individual or entity.
            </p>
            <p>
              The Client further represents and warrants that it is and will remain duly licensed, authorized and
              certified by all applicable governmental regulatory authorities to operate its business.
            </p>

            <h3>9. Interruption in Provision of the Data &amp; Force Majeure</h3>
            <p>
              9.1 You acknowledge that, given the technical nature of resources the Company requires in order to provide
              the Data to you, temporary interruptions may occur in the provision of the Data and that any such
              interruptions shall not (i) result in the Company incurring any liability to you or any other third
              parties, and (ii) suspend or eliminate your payment obligations to the Company, and (iii) provide you with
              any refund rights for amounts previously paid to the Company.
            </p>
            <p>
              9.2 You acknowledge and agree that the Company shall not be responsible for any failure to perform its
              obligations hereunder if such failure is caused by events or conditions beyond the Company&rsquo;s
              reasonable control. In such an event, the Company shall be excused from the performance of its obligations
              hereunder to the extent required by any such force majeure event so long as (a) the Company uses
              commercially reasonable efforts to avoid or remove causes of non-performance, and (b) such force majeure
              event does not extend beyond one (1) month period.
            </p>

            <h3>10. Disclaimer of Warranties &amp; Limited Warranty</h3>
            <p>
              THE DATA IS PROVIDED TO YOU ON A STRICTLY &ldquo;AS IS&rdquo; BASIS. THE COMPANY DOES NOT ASSURE OR WARRANT
              THE CORRECTNESS, COMPREHENSIVENESS OR COMPLETENESS OF THE DATA AND THE COMPANY DISCLAIMS ANY AND ALL
              WARRANTIES OF ANY NATURE, EXPRESS OR IMPLIED, INCLUDING ANY WARRANTIES OF MERCHANTABILITY OR FITNESS FOR A
              PARTICULAR PURPOSE.
            </p>

            <h3>11. Limitation of Liability</h3>
            <p>
              The Company shall not be liable for any loss/damage/injury (whether general, direct, special, incidental,
              consequential), cost or expense (including reasonable attorneys&rsquo; fees and legal costs), or other
              damage caused in whole or in part, directly or indirectly by any use of the Data or any alleged or actual
              failure by the Company to comply with the terms and conditions of this Agreement, whether or not any such
              damages were foreseeable or whether the Company was advised of the possibility of such damages.
            </p>

            <h3>12. Indemnification</h3>
            <p>
              You shall indemnify, defend and hold harmless the Company, its shareholders, directors, officers,
              employees, independent contractors and agents against any claim, demand, loss, liability, damage, injury
              cost or expense (including attorneys&rsquo; fees and legal costs) which arises, directly or indirectly, out
              of your act or omission with respect to the Data or any violation/breach of the Agreement or any violation
              of Laws.
            </p>

            <h3>13. No Assignment by You</h3>
            <p>
              You may not assign your rights or obligations under this Agreement to any other individual or entity
              without the prior written consent of the Company, whether by operation of law or otherwise, and any attempt
              to do so shall be void.
            </p>

            <h3>14. Nature of the Contractual Relationship between the Parties</h3>
            <p>
              The Parties agree that nothing in this Agreement shall be construed as creating a joint venture,
              partnership, franchise, agency, employer/employee, or similar relationship between the Parties, or as
              authorizing either Party to act as the agent of the other.
            </p>

            <h3>15. Termination</h3>
            <p>
              In addition to all other legal rights and remedies available to the Company for non-payment of the Fee
              under this Agreement by you, the Company may terminate the Agreement and demand immediate return or
              destruction of the Data at any time if the Company believes that you are in breach or violation of any
              provision of this Agreement.
            </p>

            <h3>16. Governing Law &amp; Jurisdiction</h3>
            <p>
              The Agreement shall be governed by and construed under the laws of the State of Florida, USA without
              regard for the principles of conflicts of law of that State or any other state. Any litigation or other
              dispute relating to or arising under the Agreement shall only be brought before the courts located within
              the Palm Beach County, Florida, USA and you agree to submit any such dispute/litigation to the exclusive
              jurisdiction of those courts and waive any objections to the venue of any such proceeding in those courts.
            </p>

            <h3>17. Entire Agreement, Amendment &amp; Waiver</h3>
            <p>
              This Agreement sets forth the entire agreement and understanding between you and the Company and
              supersedes any prior understandings or agreements, oral or written, relating to the subject matter of the
              Agreement. The Agreement may only be amended by means of a written instrument executed by both you and the
              Company. No waiver of any breach of the Agreement shall be deemed to be a waiver of a future breach,
              whether of a similar or different nature, and no waiver shall be effective unless issued by the waiving
              Party by means of an express written waiver, signed/executed by such waiving party.
            </p>

            <h3>18. Execution &amp; Counterparts</h3>
            <p>
              The Agreement may be executed in its original printed out version, by electronic signature or facsimile or
              in electronically transmitted portable document and it may be executed in any number of counterparts, each
              of which shall be deemed an original of the same document.
            </p>

          </div>
        </div>
      </section>
    </div>
  )
}
