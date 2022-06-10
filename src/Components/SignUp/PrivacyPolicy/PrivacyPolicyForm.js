import React, { useEffect, useState } from "react";
import ReactDatePicker from "react-datepicker";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import selector from "../../../redux/selector";
import { AppointmentActions } from "../../../redux/slice/appointment.slice";

function PrivacyPolicyForm() {
  const history = useHistory();
  const [disabled, setDisabled] = useState(true);

  const handleChange = (e) => {
    e.target.checked ? setDisabled(false) : setDisabled(true);
  };

  const handleClick = (e) => {
    history.push("/home/dashboard");
  };

  const handleTermsandServices = () => {
    history.push("/signup/termsandservices");
  };

  return (
    <>
      <div className="bg-white create-account mb-10">
        <div className="form-content xl:px-32 lg:px-32 md:px-16 sm:px-10 px-4 py-10">
          <div className="flex justify-between mb-10 items-end">
            <div>
              <h1 className="hepta-bold font-32 primary-text-color whitespace-nowrap">
                {/* Telehealth Consent Form */}
                Verbena Privacy Policy
              </h1>
              {/* <p>
              Last Updated: Friday, November 26, 2021
              </p> */}
            </div>
          </div>
          <div className="tele-health-content mb-8">
            <p className="dd text-lg caliber-regular mb-4 dark-gray-color">
              This Privacy Policy describes the privacy practices of Verbena
              (“we”, “us”, or “our”) and how we handle personal information that
              we collect through our website and platform (collectively, the
              “Service” or “Services”).
            </p>
            <p className="dd text-lg caliber-regular mb-4 dark-gray-color">
              Please note that as part of the Services, we may process
              information that is subject to the Health Insurance Portability
              and Accountability Act (“HIPAA”). When governed by HIPAA, this
              information is called “Protected Health Information” or “PHI.”
              Among other things, HIPAA regulates what our health care partners
              may do with your PHI. As a HIPAA “business associate” of these
              partners, Verbena must also comply with HIPAA when handling this
              information.
            </p>
            <p className="dd text-lg caliber-regular mb-4 dark-gray-color">
              Please note that as part of the Services, we may process
              information that is subject to the Health Insurance Portability
              and Accountability Act (“HIPAA”). When governed by HIPAA, this
              information is called “Protected Health Information” or “PHI.”
              Among other things, HIPAA regulates what our health care partners
              may do with your PHI. As a HIPAA “business associate” of these
              partners, Verbena must also comply with HIPAA when handling this
              information.
            </p>
            <h3 className="mb-3">Personal Information We Collect</h3>
            <p className="dd text-lg caliber-regular mb-4 dark-gray-color">
              We collect personal information from patient consumers and
              healthcare professionals. These individuals may provide
              information about themselves (e.g., patients who use the Service)
              as well as about each other (e.g., physicians who provide
              information about their patients)
            </p>
            <ul className="list-disc pl-6">
              <li>
                <p className="dd text-lg caliber-regular mb-4 dark-gray-color">
                  <b>Contact details,</b> such as your first and last name,
                  email and mailing addresses, and phone number.
                </p>
              </li>

              <li>
                <p className="dd text-lg caliber-regular mb-4 dark-gray-color">
                  <b>Biographical and demographic information,</b> such as date
                  of birth, age, gender, marital status, and information
                  regarding any parents or legal guardians.
                </p>
              </li>
              <li>
                <p className="dd text-lg caliber-regular mb-4 dark-gray-color">
                  <b>Health and medical information,</b> such as medical
                  insurance details, information about physical and mental
                  health conditions and diagnoses, treatments for medical
                  conditions, family medical history, and medications an
                  individual may take, including the dosage, timing, and
                  frequency.
                </p>
              </li>
              <li>
                <p className="dd text-lg caliber-regular mb-4 dark-gray-color">
                  <b>Communications</b> that we exchange with you, including
                  when you contact us with questions, feedback, or otherwise.
                </p>
              </li>
              <li>
                <p className="dd text-lg caliber-regular mb-4 dark-gray-color">
                  <b>Payment and transactional data</b> needed to complete your
                  orders on or through the Service (including name, payment card
                  information, bank account number, billing information), and
                  your purchase history.
                </p>
              </li>
              <li>
                <p className="dd text-lg caliber-regular mb-4 dark-gray-color">
                  <b>Marketing data,</b> such as your preferences for receiving
                  our marketing communications, and details about your
                  engagement with them.
                </p>
              </li>
            </ul>
            <p className="dd text-lg caliber-regular mb-4 dark-gray-color">
              <b>Third party sources.</b> We may combine personal information we
              receive from you with personal information we obtain from other
              sources.
            </p>
            <p className="dd text-lg caliber-regular mb-4 dark-gray-color">
              <b>Automatic data collection.</b> We and our service providers may
              automatically log information about you, your computer or mobile
              device, and your interaction over time with the Services, our
              communications and other online services, such as:
            </p>
            <ul className="list-disc pl-6">
              <li>
                <p className="dd text-lg caliber-regular mb-4 dark-gray-color">
                  <b>Device data,</b> such as your computer’s or mobile device’s
                  operating system type and version, manufacturer and model,
                  browser type, screen resolution, RAM and disk size, CPU usage,
                  device type (e.g., phone, tablet), IP address, unique
                  identifiers (including identifiers used for advertising
                  purposes), language settings, mobile device carrier,
                  radio/network information (e.g., WiFi, LTE, 3G), and general
                  location information such as city, state, or geographic area.
                </p>
              </li>
              <li>
                <p className="dd text-lg caliber-regular mb-4 dark-gray-color">
                  <b>Online activity data,</b> such as pages or screens you
                  viewed, how long you spent on a page or screen, the website
                  you visited before browsing to the Service, navigation paths
                  between pages or screens, information about your activity on a
                  page or screen, access times, and duration of access, and
                  whether you have opened our marketing emails or clicked links
                  within them.
                </p>
              </li>
              <li>
                <p className="dd text-lg caliber-regular mb-4 dark-gray-color">
                  <b>Cookies,</b> which are text files that websites store on a
                  visitor‘s device to uniquely identify the visitor’s browser or
                  to store information or settings in the browser for the
                  purpose of helping you navigate between pages efficiently,
                  remembering your preferences, enabling functionality, helping
                  us understand user activity and patterns, and facilitating
                  online advertising.
                </p>
              </li>
              <li>
                <p className="dd text-lg caliber-regular mb-4 dark-gray-color">
                  <b>Web beacons,</b> also known as pixel tags or clear GIFs,
                  which are used to demonstrate that a webpage or email was
                  accessed or opened, or that certain content was viewed or
                  clicked.
                </p>
              </li>
            </ul>
            <h3>How We Use Personal Information</h3>
            <p className="dd text-lg caliber-regular mb-4 dark-gray-color">
              We use your personal information for the following purposes:
            </p>
            <p className="dd text-lg caliber-regular mb-4 dark-gray-color">
              <b>To provide services</b> including to:
            </p>
            <ul className="list-disc pl-6">
              <li>
                <p className="dd text-lg caliber-regular mb-4 dark-gray-color">
                  Provide, operate and improve our Services, including
                  facilitating your interaction with health care professionals;
                </p>
              </li>
              <li>
                <p className="dd text-lg caliber-regular mb-4 dark-gray-color">
                  Process your payments and complete transactions with you;
                </p>
              </li>
              <li>
                <p className="dd text-lg caliber-regular mb-4 dark-gray-color">
                  Communicate with you about our Services, including by sending
                  announcements, updates, security alerts, and support and
                  administrative messages;
                </p>
              </li>
              <li>
                <p className="dd text-lg caliber-regular mb-4 dark-gray-color">
                  Understand your needs and interests, and personalize your
                  experience within the Services and our communications; and
                </p>
              </li>
              <li>
                <p className="dd text-lg caliber-regular mb-4 dark-gray-color">
                  Provide support, and respond to your requests, questions and
                  feedback.
                </p>
              </li>
            </ul>
            <p className="dd text-lg caliber-regular mb-4 dark-gray-color">
              <b>Research and development.</b> We may create aggregated,
              de-identified or other anonymous data from personal information we
              collect. We may use this anonymous data and share it with third
              parties for our lawful business purposes, including to analyze and
              improve the Services.
            </p>
            <p className="dd text-lg caliber-regular mb-4 dark-gray-color">
              <b>Marketing and advertising.</b> We and our advertising partners
              may use personal information for the our marketing and advertising
              purposes, including:
            </p>
            <ul className="list-disc pl-6">
              <li>
                <p className="dd text-lg caliber-regular mb-4 dark-gray-color">
                  We may send you Verbena direct marketing communications as
                  permitted by law, including, but not limited to, notifying you
                  of special promotions, offers and events via postal mail,
                  email, telephone, text message, and other means. You may opt
                  out of our marketing communications as described in the
                  “Online tracking opt out” section below.
                </p>
              </li>
              <li>
                <p className="dd text-lg caliber-regular mb-4 dark-gray-color">
                  We and our partners, including third party advertising
                  companies and social media companies, may display ads on the
                  Service and other online services. These companies may use
                  cookies and similar technologies to collect information about
                  your interaction (including the data described in the
                  “Automatic data collection” section above) over time across
                  the Service, our communications and other online services, and
                  use that information to serve online ads that they think will
                  interest you. This is called interest-based advertising. We
                  may also share information about our users with these
                  companies to facilitate interest-based advertising to those or
                  similar users on other online platforms. You can learn more
                  about your choices for limiting interest-based advertising in
                  the “Online tracking opt out” section below.
                </p>
              </li>
            </ul>
            <p className="dd text-lg caliber-regular mb-4 dark-gray-color">
              <b>Compliance and protection.</b> We may use your personal
              information to:
            </p>
            <ul className="list-disc pl-6">
              <li>
                <p className="dd text-lg caliber-regular mb-4 dark-gray-color">
                  Comply with applicable laws, lawful requests, and legal
                  process, such as to respond to subpoenas or requests from
                  government authorities;
                </p>
              </li>
              <li>
                <p className="dd text-lg caliber-regular mb-4 dark-gray-color">
                  Protect our, your or others’ rights, privacy, safety or
                  property (including by making and defending legal claims);
                </p>
              </li>
              <li>
                <p className="dd text-lg caliber-regular mb-4 dark-gray-color">
                  Audit our internal processes for compliance with legal and
                  contractual requirements and internal policies;
                </p>
              </li>
              <li>
                <p className="dd text-lg caliber-regular mb-4 dark-gray-color">
                  Enforce the terms and conditions that govern the Service; and
                </p>
              </li>
              <li>
                <p className="dd text-lg caliber-regular mb-4 dark-gray-color">
                  Prevent, identify, investigate and deter fraudulent, harmful,
                  unauthorized, unethical or illegal activity, including
                  cyberattacks and identity theft.
                </p>
              </li>
            </ul>
            <h3>How We Share Your Personal Information</h3>
            <p className="dd text-lg caliber-regular mb-4 dark-gray-color">
              We may share your personal information with the following parties
              and as otherwise described in this Privacy Policy or at the time
              of collection:
            </p>
            <p className="dd text-lg caliber-regular mb-4 dark-gray-color">
              <b>Affiliates.</b> Our corporate parent, subsidiaries, and
              affiliates, for purposes consistent with this Privacy Policy.
            </p>
            <p className="dd text-lg caliber-regular mb-4 dark-gray-color">
              <b>Health care partners.</b> The health care providers and
              pharmacies with whom we partner, including to provide our
              telehealth services and to fulfill your prescription orders.
            </p>
            <p className="dd text-lg caliber-regular mb-4 dark-gray-color">
              <b>Service providers.</b> Companies and individuals that provide
              services on our behalf or help us operate the Service or our
              business (such as coordinating orders and prescription fulfillment
              from pharmacy partners, hosting, information technology, customer
              support, email delivery, and website analytics services).
            </p>
            <p className="dd text-lg caliber-regular mb-4 dark-gray-color">
              <b>Professional advisors.</b> Professional advisors, such as
              lawyers, auditors, bankers and insurers, where necessary in the
              course of the professional services that they render to us.
            </p>
            <p className="dd text-lg caliber-regular mb-4 dark-gray-color">
              <b>Authorities and others.</b> Law enforcement, government
              authorities, and private parties, as we believe in good faith to
              be necessary or appropriate for the compliance and protection
              purposes described above.
            </p>
            <p className="dd text-lg caliber-regular mb-4 dark-gray-color">
              <b>Business transferees.</b> Acquirers and other relevant
              participants in business transactions (or negotiations for such
              transactions) involving a corporate divestiture, merger,
              consolidation, acquisition, reorganization, sale or other
              disposition of all or any portion of the business or assets of, or
              equity interests in, Verbena or our affiliates (including, in
              connection with a bankruptcy or similar proceedings).
            </p>
            <h3>Your Choices</h3>
            <p className="dd text-lg caliber-regular mb-4 dark-gray-color">
              <b>Access to information.</b> To keep your information accurate,
              current, and complete, please contact us as specified below. We
              will take reasonable steps to update or correct information in our
              possession that you have previously submitted via the Service.
              Please also feel free to contact us if you have any questions
              about our Privacy Policy or the information practices of the
              Service at info@verbenacare.com.
            </p>
            <p className="dd text-lg caliber-regular mb-4 dark-gray-color">
              <b>Opt out of marketing communications.</b> You may opt out of
              marketing-related communications by following the opt out or
              unsubscribe instructions contained in the marketing communication
              we send you. You may continue to receive service-related and other
              non-marketing emails.
            </p>
            <p className="dd text-lg caliber-regular mb-4 dark-gray-color">
              <b>Online tracking opt out.</b> There are a number of ways to opt
              out of having your online activity and device data collected
              through the Service, which we have summarized below:
            </p>
            <ul className="list-disc pl-6">
              <li>
                <p className="dd text-lg caliber-regular mb-4 dark-gray-color">
                  <b>Blocking cookies in your browser.</b> Most browsers let you
                  remove or reject cookies, including cookies used for
                  interest-based advertising. To do this, follow the
                  instructions in your browser settings. Many browsers accept
                  cookies by default until you change your settings. For more
                  information about cookies, including how to see what cookies
                  have been set on your device and how to manage and delete
                  them, visit www.allaboutcookies.org.
                </p>
              </li>
              <li>
                <p className="dd text-lg caliber-regular mb-4 dark-gray-color">
                  <b>Blocking advertising ID use in your mobile settings.</b>{" "}
                  Your mobile device settings may provide functionality to limit
                  use of the advertising ID associated with your mobile device
                  for interest-based advertising purposes.
                </p>
              </li>
              <li>
                <p className="dd text-lg caliber-regular mb-4 dark-gray-color">
                  <b>Using privacy plug-ins or browsers.</b> You can block our
                  websites from setting cookies used for interest-based ads by
                  using a browser with privacy features, like Brave, or
                  installing browser plugins like Privacy Badger, Ghostery, or
                  uBlock Origin, and configuring them to block third party
                  cookies/trackers. You can also opt out of Google Analytics by
                  downloading and installing the browser plug-in available at:
                  https://tools.google.com/dlpage/gaoptout.
                </p>
              </li>
              <li>
                <p className="dd text-lg caliber-regular mb-4 dark-gray-color">
                  <b>Platform opt outs.</b> The following advertising partners
                  offer opt out features that let you opt out of use of your
                  information for interest-based advertising:
                </p>
              </li>
              <li>
                <p className="dd text-lg caliber-regular mb-4 dark-gray-color">
                  <b>Advertising industry opt out tools.</b> You can also use
                  these opt out options to limit use of your information for
                  interest-based advertising by participating companies:
                </p>
              </li>
            </ul>
            <p className="dd text-lg caliber-regular mb-4 dark-gray-color">
              Note that because these opt out mechanisms are specific to the
              device or browser on which they are exercised, so you will need to
              opt out on every browser and device that you use.
            </p>
            <p className="dd text-lg caliber-regular mb-4 dark-gray-color">
              <b>Do Not Track.</b> Some Internet browsers may be configured to
              send “Do Not Track” signals to the online services that you visit.
              We currently do not respond to "Do Not Track" or similar signals.
              To find out more about "Do Not Track," please visit
              http://www.allaboutdnt.com.
            </p>
            <p className="dd text-lg caliber-regular mb-4 dark-gray-color">
              <b>Declining to provide information.</b> We need to collect
              personal information to provide certain services. If you do not
              provide the information we identify as required or mandatory, we
              may not be able to provide those services.
            </p>
            <h3>Other Sites and Services</h3>
            <p className="dd text-lg caliber-regular mb-4 dark-gray-color">
              The Service may contain links to websites and other online
              services operated by third parties. In addition, our content may
              be integrated into web pages or other online services that are not
              associated with us. These links and integrations are not an
              endorsement of, or representation that we are affiliated with, any
              third party. We do not control websites or online services
              operated by third parties, and we are not responsible for their
              actions.
            </p>
            <h3>Security</h3>
            <p className="dd text-lg caliber-regular mb-4 dark-gray-color">
              We employ a number of technical, organizational and physical
              safeguards designed to protect the personal information we
              collect. However, no security measures are failsafe and we cannot
              guarantee the security of your personal information.
            </p>
            <h3>Retention</h3>
            <p className="dd text-lg caliber-regular mb-4 dark-gray-color">
              We retain personal information for as long as necessary to fulfill
              the purposes for which we collected it, including for the purposes
              of satisfying any legal, accounting, or reporting requirements, to
              establish or defend legal claims, or for fraud prevention
              purposes. To determine the appropriate retention period for
              personal information, we consider the amount, nature, and
              sensitivity of the personal information, the potential risk of
              harm from unauthorized use or disclosure of personal information,
              the purposes for which we process personal information and whether
              we can achieve those purposes through other means, and the
              applicable legal requirements.
            </p>
            <h3>International Data Transfer</h3>
            <p className="dd text-lg caliber-regular mb-4 dark-gray-color">
              We are headquartered in the United States and may use services
              providers that operate in other countries. Your personal
              information may therefore be processed in the United States or
              transferred to other locations where privacy laws may not be as
              protective as those in your state, province, or country.
            </p>
            <h3>Children</h3>
            <p className="dd text-lg caliber-regular mb-4 dark-gray-color">
              If we have obtained consent from a parent or legal guardian,
              Verbena may collect, use, and disclose the personal information of
              a child under 13 as described throughout this Privacy Policy.
              Parents or legal guardians may contact us to ask if we have
              collected their child's personal information, to review or correct
              that information, and to request that Verbena stop collecting this
              information or have it deleted. Such requests are subject to
              Verbena’s verifying to our satisfaction that the requester is in
              fact the child's parent or legal guardian.
            </p>
            <h3>Changes to This Privacy Policy</h3>
            <p className="dd text-lg caliber-regular mb-4 dark-gray-color">
              We reserve the right to modify this Privacy Policy at any time. If
              we make material changes to this Privacy Policy, we will notify
              you by updating the date of this Privacy Policy and posting it on
              the Service. If required by law we will also provide notification
              of changes in another way that we believe is reasonably likely to
              reach you, such as via email or another manner through the
              Service. Any modifications to this Privacy Policy will be
              effective upon our posting the modified version (or as otherwise
              indicated at the time of posting). In all cases, your use of the
              Service after the effective date of any modified Privacy Policy
              indicates your acceptance of the modified Privacy Policy.
            </p>
            <h3>How to Contact Us</h3>
            <p className="dd text-lg caliber-regular mb-4 dark-gray-color">
              You can reach us by email at info@verbenacare.com or at the
              following mailing address: 30 Mayflower Drive, Tenafly, NJ 07670
            </p>
          </div>
          <div className="col-span-6">
            <button
              type="button"
              onClick={handleTermsandServices}
              className="mb-3 font-18 text-blue-600 underline"
            >
              Verbena Terms and Services
            </button>
          </div>
          <div className="col-span-6">
            <div className="checkbox-default">
              <input
                name="checkPolicy"
                type="checkbox"
                id="checkPolicy"
                onChange={handleChange}
              />
              <label htmlFor="checkPolicy">Accept, Privacy Policy</label>
            </div>
          </div>
          <div className="form-footer py-10">
            <div className="flex items-center justify-start">
              <button
                type="button"
                className="disabled:opacity-50 btn-login calibre-regular font-18 uppercase primary-bg-color text-white"
                disabled={disabled}
                onClick={handleClick}
              >
                Continue
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default PrivacyPolicyForm;
