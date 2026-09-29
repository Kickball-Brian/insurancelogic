import usePageMeta from '../hooks/usePageMeta'
import PageHero from '../components/PageHero'

/*
  Body copy is verbatim from the live Email Agency page
  (emailagency.com/privacy-policy/), InsuranceLogic's parent company, per the
  site owner's instruction. It refers to "Email Agency" throughout and
  includes a "Fuor Digital" reference that is on the source page itself.
  Only the page title/description below are InsuranceLogic-specific. Flag for
  legal review before treating it as InsuranceLogic's own policy.
*/
export default function PrivacyPolicyPage() {
  usePageMeta(
    "Privacy Policy | InsuranceLogic",
    "How personal information is collected, used, and protected on the InsuranceLogic website."
  )

  return (
    <div>
      <PageHero minHeight="32vh">
        <span className="section-label">Legal</span>
        <h1 className="page-title">Privacy Policy</h1>
      </PageHero>

      <section className="section" style={{ paddingTop: 48 }}>
        <div className="container">
          <div className="legal-prose">
            <p>
              Email Agency is committed to protecting your privacy and developing
              technology that gives you the most powerful and safe online
              experience. This Statement of Privacy applies to the Email Agency
              Web site and governs data collection and usage. By using the Email
              Agency website, you consent to the data practices described in this
              statement.
            </p>

            <h2>Collection of your Personal Information</h2>
            <p>
              Email Agency collects personally identifiable information, such as
              your e-mail address, name, home or work address or telephone number.
              Email Agency also collects anonymous demographic information, which
              is not unique to you, such as your ZIP code, age, gender,
              preferences, interests and favorites.
            </p>
            <p>
              There is also information about your computer hardware and software
              that is automatically collected by Email Agency. This information
              can include: your IP address, browser type, domain names, access
              times and referring Web site addresses. This information is used by
              Email Agency for the operation of the service, to maintain quality
              of the service, and to provide general statistics regarding use of
              the Email Agency Web site.
            </p>
            <p>
              Please keep in mind that if you directly disclose personally
              identifiable information or personally sensitive data through Email
              Agency public message boards, this information may be collected and
              used by others. Note: Email Agency does not read any of your private
              online communications.
            </p>
            <p>
              Email Agency encourages you to review the privacy statements of Web
              sites you choose to link to from Email Agency so that you can
              understand how those Web sites collect, use and share your
              information. Email Agency is not responsible for the privacy
              statements or other content on Web sites outside of the Email Agency
              and Email Agency family of Web sites.
            </p>

            <h2>Use of your Personal Information</h2>
            <p>
              Email Agency collects and uses your personal information to operate
              the Email Agency Web site and deliver the services you have
              requested. Email Agency also uses your personally identifiable
              information to inform you of other products or services available
              from Email Agency and its affiliates. Email Agency may also contact
              you via surveys to conduct research about your opinion of current
              services or of potential new services that may be offered.
            </p>
            <p>
              Email Agency does not sell, rent or lease its customer lists to
              third parties. Email Agency may, from time to time, contact you on
              behalf of external business partners about a particular offering
              that may be of interest to you. In those cases, your unique
              personally identifiable information (e-mail, name, address,
              telephone number) is not transferred to the third party. In
              addition, Email Agency may share data with trusted partners to help
              us perform statistical analysis, send you email or postal mail,
              provide customer support, or arrange for deliveries. All such third
              parties are prohibited from using your personal information except
              to provide these services to Email Agency, and they are required to
              maintain the confidentiality of your information.
            </p>
            <p>
              Email Agency does not use or disclose sensitive personal
              information, such as race, religion, or political affiliations,
              without your explicit consent.
            </p>
            <p>
              Email Agency keeps track of the Web sites and pages our customers
              visit within Email Agency, in order to determine what Email Agency
              services are the most popular. This data is used to deliver
              customized content and advertising within Email Agency to customers
              whose behavior indicates that they are interested in a particular
              subject area.
            </p>
            <p>
              Email Agency Web sites will disclose your personal information,
              without notice, only if required to do so by law or in the good
              faith belief that such action is necessary to: (a) conform to the
              edicts of the law or comply with legal process served on Fuor
              Digital or the site; (b) protect and defend the rights or property
              of Email Agency; and, (c) act under exigent circumstances to protect
              the personal safety of users of Email Agency, or the public.
            </p>

            <h2>Security of your Personal Information</h2>
            <p>
              Email Agency secures your personal information from unauthorized
              access, use or disclosure. Email Agency secures the personally
              identifiable information you provide on computer servers in a
              controlled, secure environment, protected from unauthorized access,
              use or disclosure. When personal information (such as a credit card
              number) is transmitted to other Web sites, it is protected through
              the use of encryption, such as the Secure Socket Layer (SSL)
              protocol.
            </p>

            <h2>Changes to this Statement</h2>
            <p>
              Email Agency will occasionally update this Statement of Privacy to
              reflect company and customer feedback. Email Agency encourages you
              to periodically review this Statement to be informed of how Email
              Agency is protecting your information.
            </p>

            <h2>Contact Information</h2>
            <p>
              Email Agency welcomes your comments regarding this Statement of
              Privacy. If you believe that Email Agency has not adhered to this
              Statement, please contact Email Agency at{' '}
              <a href="mailto:info@emailagency.com">info@emailagency.com</a>. We
              will use commercially reasonable efforts to promptly determine and
              remedy the problem.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
