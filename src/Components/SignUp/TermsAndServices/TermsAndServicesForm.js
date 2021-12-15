import React, { useEffect, useState } from "react";
import ReactDatePicker from "react-datepicker";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import selector from "../../../redux/selector";
import { AppointmentActions } from "../../../redux/slice/appointment.slice";

function TermsAndServicesForm() {
  const history = useHistory()
  const [disabled, setDisabled] = useState(true);

  const handleChange = (e) => {
    e.target.checked ? setDisabled(false) : setDisabled(true)
  };

  const handleClick = (e) => {
    history.push('/subscription')
  }

  return (
    <>
      <div className="bg-white create-account mb-10">
        <div className="form-content xl:px-32 lg:px-32 md:px-16 sm:px-10 px-4 py-10">
          <div className="flex justify-between mb-10 items-end">
            <div>
              <h1 className="hepta-bold font-32 primary-text-color whitespace-nowrap">
                {/* Telehealth Consent Form */}
                VERBENA TERMS OF SERVICE
              </h1>
              {/* <p>
              Last Updated: Friday, November 26, 2021
              </p> */}
            </div>
          </div>
          <div className="tele-health-content mb-8">
            <p className="dd text-lg caliber-regular mb-4 dark-gray-color">
              <b>Date of Last Revision: December 9 2021</b>
            </p>
            <p className="dd text-lg caliber-regular mb-4 dark-gray-color">
              Verbena, Inc. <b>(“Verbena,” “we,” “us,” “our”)</b> provides certain services (described below) to you through its website located at verbenacare.com (the <b>“Site”</b>) or other websites maintained by us, including any updated or new features, functionality and technology, (the <b>“Services”</b>), subject to the following terms of service (as amended from time to time, the <b>“Terms of Service”</b>).  By accessing, browsing, or otherwise using the Site or any other aspect of the Services, you acknowledge that you have read, understood, and agree to be bound by these Terms of Service.  If you do not accept the terms and conditions of these Terms of Service, you will not access, browse, or otherwise use the Services.
            </p>
            <p className="dd text-lg caliber-regular mb-4 dark-gray-color">
              We reserve the right, at our sole discretion, to change or modify portions of these Terms of Service at any time.  If we do this, we will post the changes on this page and will indicate at the top of this page the date these terms were last revised.  We will also notify you, either through the Services user interface, in an email notification or through other reasonable means.  Any such changes will become effective no earlier than fourteen (14) days after they are posted, except that changes addressing new functions of the Services or changes made for legal reasons will be effective immediately.  You should periodically visit this page to review the current Terms of Service so you are aware of any revisions.  If you do not agree to abide by these or any future Terms of Service, you will not access, browse, or use (or continue to access, browse, or use) the Service.  Your continued use of the Services after the date any such changes become effective constitutes your acceptance of the new Terms of Service.
            </p>
            <p className="dd text-lg caliber-regular mb-4 dark-gray-color">
              <b>PLEASE READ THESE TERMS OF SERVICE CAREFULLY, AS THEY CONTAIN AN AGREEMENT TO ARBITRATE AND OTHER IMPORTANT INFORMATION REGARDING YOUR LEGAL RIGHTS, REMEDIES, AND OBLIGATIONS.  THIS AGREEMENT TO ARBITRATE REQUIRES (WITH LIMITED EXCEPTION) THAT YOU SUBMIT CLAIMS YOU HAVE AGAINST US TO BINDING AND FINAL ARBITRATION, AND FURTHER (1) YOU WILL ONLY BE PERMITTED TO PURSUE CLAIMS AGAINST VERBENA ON AN INDIVIDUAL BASIS, NOT AS A PLAINTIFF OR CLASS MEMBER IN ANY CLASS OR REPRESENTATIVE ACTION OR PROCEEDING, (2) YOU WILL ONLY BE PERMITTED TO SEEK RELIEF (INCLUDING MONETARY, INJUNCTIVE, AND DECLARATORY RELIEF) ON AN INDIVIDUAL BASIS, AND (3) YOU MAY NOT BE ABLE TO HAVE ANY CLAIMS YOU HAVE AGAINST US RESOLVED BY A JURY OR IN A COURT OF LAW.</b>
            </p>
            <h3 className="mb-3">
              Your Privacy
            </h3>
            <p className="dd text-lg caliber-regular mb-4 dark-gray-color">
              At Verbena, we respect the privacy of our users.  For details please see our Privacy Policy governing the Services.  By using the Services, you consent to our collection and use of personal data as outlined therein.  All such terms are hereby incorporated by reference into these Terms of Service.
            </p>
            <h3 className="mb-3">
              Additional Terms
            </h3>
            <p className="dd text-lg caliber-regular mb-4 dark-gray-color">
              In addition, when using or receiving the Services, you will be subject to any additional terms applicable to such Services that may be posted on the Services from time to time.  All such terms are hereby incorporated by reference into these Terms of Service.
            </p>
            <h3 className="mb-3">
              Access and Use of the Services
            </h3>
            <p className="dd text-lg caliber-regular mb-4 dark-gray-color">
              <b>Services Description:</b>  The Services provide a web-based platform through which users can receive telehealth services and communicate via electronic messages with their medical practitioner
            </p>
            <h3 className="dd text-lg caliber-regular mb-4 dark-gray-color">
              IF YOU THINK YOUR PET MAY HAVE A MEDICAL EMERGENCY, CALL VISIT YOUR LOCAL EMERGENCY ANIMAL HOSPITAL IMMEDIATELY.
            </h3>
            <p className="dd text-lg caliber-regular mb-4 dark-gray-color">
              <b>Your Registration Obligations:</b> You may be required to register with Verbena via the Services in order to access and use certain features of the Services, including to schedule a telehealth visit.  If you choose to register for the Services, you agree to provide and maintain true, accurate, current and complete information about yourself as prompted by the registration form.  Such registration data and certain other information about you are governed by our Privacy Policy.  Verbena is not liable for any loss or damage arising from your failure to comply with these obligations.
            </p>
            <p className="dd text-lg caliber-regular mb-4 dark-gray-color">
              <b>User Account, Password and Security:</b>  When creating your account, you represent and warrant that you will provide accurate and complete information.  You are expected to use “strong” passwords (passwords that use a combination of upper and lowercase letters, numbers and symbols) with your account.  You are responsible for maintaining the confidentiality of your password and account, if any, and are fully responsible for any and all activities that occur under your password or account, even if due to misuse or any unauthorized access.  You must exercise caution when accessing your account from a public or shared computer so that others are not able to view or record your password or other personal information.  You understand and agree that your account is personal to you and you agree not to provide any other person with access to the Services using your username, password, or other security information.  You also agree to ensure that you logout from your account at the end of each session.  You agree to immediately notify Verbena of any unauthorized use of your password or account or any other breach of security.  Verbena will not be liable for any loss or damage arising from your failure to comply with this Section.
            </p>
            <p className="dd text-lg caliber-regular mb-4 dark-gray-color">
              <b>Modifications to Services:</b> Verbena reserves the right to suspend, limit, condition modify or discontinue, temporarily or permanently, the Services (or any part thereof) with or without notice.  You agree that Verbena will not be liable to you or to any third party for any modification, suspension or discontinuance of the Services.
            </p>
            <p className="dd text-lg caliber-regular mb-4 dark-gray-color">
              <b>General Practices Regarding Use and Storage:</b> You acknowledge that Verbena may establish general practices and limits concerning use of the Services, including without limitation the maximum period of time that data or other content will be retained by the Services and the maximum storage space that will be allotted on Verbena’s servers on your behalf.  You acknowledge that Verbena reserves the right to terminate accounts that are inactive for an extended period of time.  You further acknowledge that Verbena reserves the right to change these general practices and limits at any time, in its sole discretion, with or without notice. You further acknowledge that in the event Verbena terminates an inactive account, Verbena may delete any data any once the account is deemed to be inactive.
            </p>
            <h3 className="mb-3">
              Payment
            </h3>
            <p className="dd text-lg caliber-regular mb-4 dark-gray-color">
              <b>Registering for an Account:</b>  In order to register for an account, you will be required to submit credit card or other payment information at the time of registration.
            </p>
            <p className="dd text-lg caliber-regular mb-4 dark-gray-color">
              <b>Fees:</b>  You will be responsible for any payments that apply to your telehealth visit. By accepting these Terms of Service, you agree that Verbena will not submit or facilitate the submission of any claims to any commercial insurance. Your personal provider may/will submit a claim to your insurance provider for diagnosis and services rendered.
            </p>
            <p className="dd text-lg caliber-regular mb-4 dark-gray-color">
              <b>Payment Method:</b>  Collection of your credit card or other payment information and the processing of payment of fees will be performed by third party payment processers (the <b>“Payment Processors”</b>).  Verbena currently uses Stripe and PayPal as its Payment Processor, but reserves the right to change Payment Processors.  You will tender payment to the applicable Payment Processor.  Fees will be processed by the applicable Payment Processor.  You are bound by the applicable Payment Processor’s terms and conditions for the processing of payments, as the same may be modified by such Payment Processor from time to time (collectively, the <b>“Payment Processer Terms”</b>).  Information provided to any Payment Processor is governed by the applicable Payment Processor Terms. We are not responsible for the performance of any Payment Processor.  You represent and warrant to Verbena that such information is true and that you are authorized to use the payment instrument.  You agree to pay Verbena the amount that is specified in the payment plan in accordance with the terms of such plan and these Terms of Service.  You shall be responsible for all taxes associated with the Services other than U.S. taxes based on Verbena’s net income.  If your payment fails, we may immediately cancel or revoke your access to the Services.  If you contact your bank or credit card company to decline or reverse the charge of fees, we may revoke your access to our Services in general.  If you dispute any charges you must let Verbena know within thirty (30) days after the date that Verbena charges you.
            </p>
            <h3 className="mb-3">
              Conditions of Access and Use
            </h3>
            <p className="dd text-lg caliber-regular mb-4 dark-gray-color">
              <b>User Conduct:</b> You are solely responsible for all code, content, images, information, data, text, software, photographs, graphics, messages or other materials (“content”) that you upload, share, input, post, publish, email or display (hereinafter, “share”) via the Services (collectively, the “User Content”).  The following are examples of the kind of content and/or use that is illegal or prohibited by Verbena.  Verbena reserves the right to investigate and take appropriate legal action against anyone who, in Verbena’s sole discretion, violates this provision, including without limitation, removing the offending content from the Services, suspending or terminating the account of such violators and reporting you to the law enforcement authorities.  You agree to not use the Services to:
            </p>
            <ol className="pl-6" type="A">
              <li>
                <p className="dd text-lg caliber-regular mb-4 dark-gray-color">
                  <b>a)</b>	share any content that (i) infringes any intellectual property or other proprietary rights of any party; (ii) you do not have a right to upload under any law or under contractual or fiduciary relationships; (iii) contains software viruses or any other code, files or programs designed to interrupt, destroy or limit the functionality of any computer software or hardware or telecommunications equipment; (iv) poses or creates a privacy or security risk to any person; (v) is illegal, offensive, harmful, threatening, abusive, harassing, tortious, excessively violent, defamatory, vulgar, obscene, pornographic, libelous, invasive of another’s privacy, hateful racially, ethnically or otherwise objectionable; (vi) is false, misleading, or otherwise deceptive; or (vii) in the sole judgment of Verbena, may expose Verbena or its users to any harm or liability of any type;
                </p>
              </li>
              <li>
                <p className="dd text-lg caliber-regular mb-4 dark-gray-color">
                  <b>b)</b>	interfere with or disrupt the Services or servers or networks connected to the Services, or disobey or violate any requirements, procedures, policies or regulations of networks connected to the Services;
                </p>
              </li>
              <li>
                <p className="dd text-lg caliber-regular mb-4 dark-gray-color">
                  <b>c)</b>	violate any applicable law, or any regulations having the force of law;
                </p>
              </li>
              <li>
                <p className="dd text-lg caliber-regular mb-4 dark-gray-color">
                  <b>d)</b>	impersonate any person or entity, or falsely state or misrepresent your affiliation with a person or entity;
                </p>
              </li>
              <li>
                <p className="dd text-lg caliber-regular mb-4 dark-gray-color">
                  <b>e)</b>	harvest or collect email addresses or other contact information or personally identifiable information of other users of the Services;
                </p>
              </li>
              <li>
                <p className="dd text-lg caliber-regular mb-4 dark-gray-color">
                  <b>f)</b>	take any action that imposes, or may impose, as determined in our sole discretion, an unreasonable or disproportionately large load on our infrastructure;
                </p>
              </li>
              <li>
                <p className="dd text-lg caliber-regular mb-4 dark-gray-color">
                  <b>g)</b>	copy or store any significant portion of the Service Content;
                </p>
              </li>
              <li>
                <p className="dd text-lg caliber-regular mb-4 dark-gray-color">
                  <b>h)</b>	monetize the Service Content through advertising, subscriptions or other means;
                </p>
              </li>
              <li>
                <p className="dd text-lg caliber-regular mb-4 dark-gray-color">
                  <b>i)</b>	further or promote any criminal activity or enterprise;
                </p>
              </li>
              <li>
                <p className="dd text-lg caliber-regular mb-4 dark-gray-color">
                  <b>j)</b>	circumvent, remove, alter, deactivate, degrade, or thwart any of the content protections in or geographic restrictions on any content (including Service Content) available on or through the Service, including through the use of virtual private networks, or by bypassing measures preventing or restricting access to the Services or Service Content; or
                </p>
              </li>
              <li>
                <p className="dd text-lg caliber-regular mb-4 dark-gray-color">
                  <b>k)</b>	engage in or use any data mining, robots, scraping, or similar data gathering or extraction methods.  If you are blocked by Verbena from accessing the Services (including by blocking your IP address), you agree not to implement any measures to circumvent such blocking (e.g., by masking your IP address or using a proxy IP address or virtual private network).
                </p>
              </li>
            </ol>
            <p className="dd text-lg caliber-regular mb-4 dark-gray-color">
              <b>Commercial Use:</b> Unless otherwise expressly authorized herein or in the Services, you agree not to display, distribute, license, perform, publish, reproduce, duplicate, copy, create derivative works from, modify, sell, resell, exploit, transfer or share for any commercial purposes, any portion of the Services, use of the Service, or access to the Service.  The Services are solely for your personal, non-commercial use.
            </p>
            <h3 className="mb-3">
              Mobile Services
            </h3>
            <p className="dd text-lg caliber-regular mb-4 dark-gray-color">
              <b>Mobile Services:</b> The Services include certain functions that are available via a mobile device, including (i) the ability to share content to the Services via a mobile device, (ii) the ability to browse the Services and from a mobile device, and (iii) the ability to access certain features and content through Mobile Apps (collectively, the <b>“Mobile Services”)</b>.  To the extent you access the Services through a mobile device, your wireless service carrier’s standard charges, data rates, and other fees may apply. In addition, downloading, installing, or using certain Mobile Services may be prohibited or restricted by your carrier, and not all Mobile Services may work with all carriers or devices.
            </p>
            <p className="dd text-lg caliber-regular mb-4 dark-gray-color">
              <b>Text Service:</b>  By using the Services, you consent to receive future prerecorded calls and information from us via SMS and/or MMS messages sent through an automated telephone dialing system <b>(“Text Service”)</b>, even if you have opted in to the National Do Not Call List, any state Do not Call List, or the internal Do Not Call List of any company.  You may be required to respond to an initial message as instructed to complete your registration and confirm enrollment in the Text Service.  The enrollment process will disclose the program, frequency of messages, and options to cancel your enrollment.  You do not have to participate in the Text Service in order to use the Services.  In the event you no longer want to participate in the Text Service, you agree to notify us directly.  In the event you change or deactivate your mobile telephone number, you agree to promptly update your Verbena account information to ensure that your messages are not sent to the person that acquires your old number.
            </p>
            <p className="dd text-lg caliber-regular mb-4 dark-gray-color">
              There is no additional charge for the Text Service, but your mobile carrier’s standard message and data rates apply to any messages you send or receive through the Text Service, including confirmations and subsequent texts.  Your carrier may prohibit or restrict certain mobile features and certain mobile features may be incompatible with your carrier or mobile device.  We are not liable for any delays in the receipt of, or any failures to receive, any SMS or MMS messages, as delivery is subject to effective transmission by your mobile carrier and compatibility of your mobile device.  Please contact your mobile carrier if you have any questions regarding these issues or your mobile data and messaging plan.
            </p>
            <p className="dd text-lg caliber-regular mb-4 dark-gray-color">
              As described in the Text Service enrollment and welcome messages, including messages sent to a shortcode associated with the Text Service or by reply to any message you receive from us, you may text “STOP” to cancel or “HELP” for customer support information.  If you choose to cancel your Text Service, you agree to receive a final text message from the Text Service confirming your cancellation.
            </p>
            <h3 className="mb-3">
              Patient Related Information
            </h3>
            <p className="dd text-lg caliber-regular mb-4 dark-gray-color">
              <b>Patient Related Content:</b> Any patient-related information, data, software, photographs, graphics, videos, text, images, typefaces, sounds and other material residing on the Site or the Services, separate from the information on your personal portal and that is specific to your doctor patient relationship with Verbena, describes general principles of patient care that should not be construed as specific instructions for individual patients. The patient-related information on the Site or the Services that is not in your personal portal is not intended as a substitute for a consultation between patients and their health care provider, and should not be used to diagnose or treat a health problem without consulting a qualified medical practitioner.  It is for reference only and should not be used to determine treatment for specific medical conditions—only a medical practitioner can do that.
            </p>
            <h3 className="mb-3">
              Intellectual Property Rights
            </h3>
            <p className="dd text-lg caliber-regular mb-4 dark-gray-color">
              <b>Service Content, Software and Trademarks:</b> You acknowledge and agree that the Services or Site may contain or feature content or information, including articles and other works <b>(“Service Content”)</b>, that are protected by copyright, patent, trademark, trade secret or other proprietary rights and laws.  The Content is protected by United States and foreign intellectual property laws.  Unauthorized use of the Service Content may result in violation of copyright, trademark, and other laws.  You have no rights in or to the Service Content, and you will not use, copy or display the Service Content, including but not limited to use of framing or mirrors, except as permitted under these Terms of Service.  No other use is permitted without our prior written consent, and any use of the Service or the Service Content other than as specifically authorized herein is strictly prohibited.  You may not sell, transfer, assign, license, sublicense, or modify the Service Content or reproduce, display, publicly perform, make a derivative version of, distribute, or otherwise use the Service Content in any way for any public or commercial purpose (except that the foregoing does not apply to your own User Content (as defined below) that you legally share).
            </p>
            <p className="dd text-lg caliber-regular mb-4 dark-gray-color">
              Verbena name and logos are trademarks and service marks of Verbena (collectively the <b>“Verbena Trademarks”</b>).  Other Verbena, product, and service names and logos which may be used and displayed via the Service may be trademarks or service marks of their respective owners who may or may not endorse or be affiliated with or connected to Verbena.  Nothing in these Terms of Service or the Service should be construed as granting, by implication, estoppel, or otherwise, any license or right to use any of Verbena Trademarks displayed on the Service, without our prior written permission in each instance.  All goodwill generated from the use of Verbena Trademarks will inure to our exclusive benefit.
            </p>
            <p className="dd text-lg caliber-regular mb-4 dark-gray-color">
              <b>User Content:</b>  You represent and warrant that you own all right, title and interest in and to such User Content, including, without limitation, all copyrights and rights of publicity contained therein.  You hereby grant Verbena a nonexclusive, worldwide, royalty-free, fully paid up, transferable, sublicensable (directly and indirectly through multiple tiers), perpetual, irrevocable license to copy, display, share, perform, distribute, store, modify and otherwise use your User Content, and any statistical and usage data relating to your use of the Service derived by Verbena or its third-party service providers, in connection with (a) the operation and provision of the Services, and (b) subject to the Privacy Policy, (i) the improvement of the Service and the development and provision of new products and services, and (ii) the marketing or promotion of any of the foregoing, in each case in any form, medium or technology now known or later developed.  You represent and warrant that any authorized use of your User Content by Verbena does and will not violate, misappropriate or infringe on the rights of any third party, including, without limitation, privacy rights, publicity rights, and intellectual property rights.
            </p>
            <p className="dd text-lg caliber-regular mb-4 dark-gray-color">
              You hereby authorize Verbena and its third-party service providers to derive statistical and usage data relating to your use of the Services <b>(“Usage Data”)</b>.  We may use Usage Data for any purpose in accordance with applicable law and our Privacy Policy.
            </p>
            <p className="dd text-lg caliber-regular mb-4 dark-gray-color">
              Any questions, comments, suggestions, ideas, feedback or other information about the Services <b>(“Submissions”)</b>, provided by you to Verbena are non-confidential and Verbena will be entitled to the unrestricted use and dissemination of these Submissions for any purpose, commercial or otherwise, without acknowledgment or compensation to you.
            </p>
            <p className="dd text-lg caliber-regular mb-4 dark-gray-color">
              You acknowledge and agree that Verbena may preserve content and may also disclose content if required to do so by law or in the good faith belief that such preservation or disclosure is reasonably necessary to: (a) comply with legal process, applicable laws or government requests; (b) enforce these Terms of Service; (c) respond to claims that any content violates the rights of third parties; or (d) protect the rights, property, or personal safety of Verbena, its users and the public.  You understand that the technical processing and transmission of the Service, including your content, may involve (i) transmissions over various networks; and (ii) changes to conform and adapt to technical requirements of connecting networks or devices.
            </p>
            <h3 className="mb-3">
              Third-Party Services and Websites
            </h3>
            <p className="dd text-lg caliber-regular mb-4 dark-gray-color">
              The Services may provide links or other access to services, sites, technology, and resources that are provided or otherwise made available by third parties (the <b>“Third-Party Services”</b>).  Your access and use of the Third-Party Services may also be subject to additional terms and conditions, privacy policies, or other agreements with such third party, and you may be required to authenticate to or create separate accounts to use Third-Party Services on the websites or via the technology platforms of their respective providers.  Some Third-Party Services will provide us with access to certain information that you have provided to third parties, including through such Third-Party Services, and we will use, store and disclose such information in accordance with our Privacy Policy.  For more information about the implications of activating Third-Party Services and our use, storage and disclosure of information related to you and your use of such Third-Party Services within the Services, please see our Privacy Policy.  Verbena has no control over and is not responsible for such Third-Party Services, including for the accuracy, legality, availability, reliability, or completeness of information shared by or available through Third-Party Services, and such information is subject to change without notice, or on the privacy practices of Third-Party Services.  We encourage you to review the privacy policies of the third parties providing Third-Party Services prior to using such services.  You, and not Verbena, will be responsible for any and all costs and charges associated with your use of any Third-Party Services.  Verbena enables these Third-Party Services merely as a convenience and the integration or inclusion of such Third-Party Services does not imply an endorsement or recommendation.  Any dealings you have with third parties while using the Service are between you and the third party.  Verbena will not be responsible or liable, directly or indirectly, for any damage or loss caused or alleged to be caused by or in connection with use of or reliance on any Third-Party Services.
            </p>
            <h3 className="mb-3">
              Indemnity and Release
            </h3>
            <p className="dd text-lg caliber-regular mb-4 dark-gray-color">
              You agree to defend, indemnify and hold harmless Verbena and its affiliates and its and their officers, employees, directors, service providers, licensors, and agents (collectively, <b>“Indemnitees”</b>) harmless from any from any and all losses, damages, expenses, including reasonable attorneys’ fees, rights, claims, actions of any kind and injury (including death) arising out of or relating to your use of the Services, any User Content, your connection to the Services, your violation of these Terms of Service or your violation of any rights of another.  Notwithstanding the foregoing, you will have no obligation to indemnify or hold harmless any Indemnitee from or against any liability, losses, damages or expenses incurred as a result of any action or inaction of such Indemnitee.  Verbena will provide notice to you of any such claim, suit, or proceeding. Verbena reserves the right to assume the exclusive defense and control of any matter which is subject to indemnification under this section, and you agree to cooperate with any reasonable requests assisting Company’s defense of such matter. You may not settle or compromise any claim against the Indemnitees without Verbena’s written consent.
            </p>
            <h3 className="mb-3">
              Disclaimer of Warranties
            </h3>
            <p className="dd text-lg caliber-regular mb-4 dark-gray-color">
              YOUR USE OF THE SERVICES IS AT YOUR SOLE RISK.  THE SERVICES ARE PROVIDED ON AN “AS IS” AND “AS AVAILABLE” BASIS.  VERBENA EXPRESSLY DISCLAIMS ALL WARRANTIES OF ANY KIND, WHETHER EXPRESS, IMPLIED OR STATUTORY, INCLUDING, BUT NOT LIMITED TO THE IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, TITLE AND NON-INFRINGEMENT.
            </p>
            <p className="dd text-lg caliber-regular mb-4 dark-gray-color">
              VERBENA MAKES NO WARRANTY THAT (I) THE SERVICES WILL MEET YOUR REQUIREMENTS, (II) THE SERVICES WILL BE UNINTERRUPTED, TIMELY, SECURE, OR ERROR-FREE, (III) ANY CONTENT PROVIDED THROUGH THE SERVICES IS ACCURATE, LEGALLY COMPLIANT, UP-TO-DATE, RELIABLE OR CORRECT, OR (IV) THE QUALITY OF ANY PRODUCTS, SERVICES, INFORMATION, OR OTHER MATERIAL PURCHASED OR OBTAINED BY YOU THROUGH THE SERVICES WILL MEET YOUR EXPECTATIONS.
            </p>
            <h3 className="mb-3">
              Limitation of Liability
            </h3>
            <p className="dd text-lg caliber-regular mb-4 dark-gray-color">
              YOU EXPRESSLY UNDERSTAND AND AGREE THAT, EXCEPT AS MAY BE EXPRESSLY PROVIDED HEREIN, VERBENA WILL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, EXEMPLARY DAMAGES, OR DAMAGES FOR LOSS OF PROFITS INCLUDING BUT NOT LIMITED TO, DAMAGES FOR LOSS OF GOODWILL, USE, DATA OR OTHER INTANGIBLE LOSSES (EVEN IF VERBENA HAS BEEN ADVISED OF THE POSSIBILITY OF SUCH DAMAGES), WHETHER BASED ON CONTRACT, TORT, NEGLIGENCE, STRICT LIABILITY OR OTHERWISE, RESULTING FROM: (I) THE USE OR THE INABILITY TO USE THE SERVICE; (II) THE COST OF PROCUREMENT OF SUBSTITUTE GOODS AND SERVICES RESULTING FROM ANY GOODS, DATA, INFORMATION OR SERVICES PURCHASED OR OBTAINED OR MESSAGES RECEIVED OR TRANSACTIONS ENTERED INTO THROUGH OR FROM THE SERVICE; (III) UNAUTHORIZED ACCESS TO OR ALTERATION OF YOUR TRANSMISSIONS OR DATA; OR (IV) ANY OTHER MATTER RELATING TO THE SERVICE.  IN NO EVENT WILL VERBENA’S TOTAL LIABILITY TO YOU FOR ALL DAMAGES, LOSSES OR CAUSES OF ACTION EXCEED THE AMOUNT YOU HAVE PAID VERBENA IN THE LAST SIX (6) MONTHS (IF AT ALL), OR, IF GREATER, ONE HUNDRED DOLLARS ($100).
            </p>
            <p className="dd text-lg caliber-regular mb-4 dark-gray-color">
              SOME JURISDICTIONS DO NOT ALLOW THE DISCLAIMER OR EXCLUSION OF CERTAIN WARRANTIES OR THE LIMITATION OR EXCLUSION OF LIABILITY FOR INCIDENTAL OR CONSEQUENTIAL DAMAGES.  ACCORDINGLY, SOME OF THE ABOVE LIMITATIONS SET FORTH ABOVE MAY NOT APPLY TO YOU OR BE ENFORCEABLE WITH RESPECT TO YOU.  IF YOU ARE DISSATISFIED WITH ANY PORTION OF THE SERVICE OR WITH THESE TERMS OF SERVICES, YOUR SOLE AND EXCLUSIVE REMEDY IS TO DISCONTINUE USE OF THE SERVICES.
            </p>
            <p className="dd text-lg caliber-regular mb-4 dark-gray-color">
              IF YOU ARE A USER FROM NEW JERSEY, THE FOREGOING SECTIONS TITLED “DISCLAIMER OF WARRANTIES” AND “LIMITATION OF LIABILITY” ARE INTENDED TO BE ONLY AS BROAD AS IS PERMITTED UNDER THE LAWS OF THE STATE OF NEW JERSEY.  IF ANY PORTION OF THESE SECTIONS IS HELD TO BE INVALID UNDER THE LAWS OF THE STATE OF NEW JERSEY, THE INVALIDITY OF SUCH PORTION SHALL NOT AFFECT THE VALIDITY OF THE REMAINING PORTIONS OF THE APPLICABLE SECTIONS.
            </p>
            <h3 className="mb-3">
              Dispute Resolution By Binding Arbitration:  PLEASE READ THIS SECTION CAREFULLY AS IT AFFECTS YOUR RIGHTS.
            </h3>
            <p className="dd text-lg caliber-regular mb-4 dark-gray-color">
              <b>a.	Agreement to Arbitrate</b>
            </p>
            <p className="dd text-lg caliber-regular mb-4 dark-gray-color">
              This Dispute Resolution by Binding Arbitration section is referred to in these Terms of Service as the “Arbitration Agreement.”  You agree that any and all disputes or claims that have arisen or may arise between you and Verbena, whether arising out of or relating to these Terms of Service (including any alleged breach thereof), the Services, any advertising, any aspect of the relationship or transactions between us, shall be resolved exclusively through final and binding arbitration, rather than a court, in accordance with the terms of this Arbitration Agreement, except that you may assert individual claims in small claims court, if your claims qualify.  Further, this Arbitration Agreement does not preclude you from bringing issues to the attention of federal, state, or local agencies, and such agencies can, if the law allows, seek relief against us on your behalf.  You agree that, by entering into these Terms of Service, you and Verbena are each waiving the right to a trial by jury or to participate in a class action.  Your rights will be determined by a neutral arbitrator, not a judge or jury.  The Federal Arbitration Act governs the interpretation and enforcement of this Arbitration Agreement.
            </p>
            <p className="dd text-lg caliber-regular mb-4 dark-gray-color">
              <b>b.	Prohibition of Class and Representative Actions and Non-Individualized Relief</b>
            </p>
            <p className="dd text-lg caliber-regular mb-4 dark-gray-color">
              YOU AND VERBENA AGREE THAT EACH OF US MAY BRING CLAIMS AGAINST THE OTHER ONLY ON AN INDIVIDUAL BASIS AND NOT AS A PLAINTIFF OR CLASS MEMBER IN ANY PURPORTED CLASS OR REPRESENTATIVE ACTION OR PROCEEDING.  UNLESS BOTH YOU AND VERBENA AGREE OTHERWISE, THE ARBITRATOR MAY NOT CONSOLIDATE OR JOIN MORE THAN ONE PERSON’S OR PARTY’S CLAIMS AND MAY NOT OTHERWISE PRESIDE OVER ANY FORM OF A CONSOLIDATED, REPRESENTATIVE, OR CLASS PROCEEDING.  ALSO, THE ARBITRATOR MAY AWARD RELIEF (INCLUDING MONETARY, INJUNCTIVE, AND DECLARATORY RELIEF) ONLY IN FAVOR OF THE INDIVIDUAL PARTY SEEKING RELIEF AND ONLY TO THE EXTENT NECESSARY TO PROVIDE RELIEF NECESSITATED BY THAT PARTY’S INDIVIDUAL CLAIM(S), EXCEPT THAT YOU MAY PURSUE A CLAIM FOR AND THE ARBITRATOR MAY AWARD PUBLIC INJUNCTIVE RELIEF UNDER APPLICABLE LAW TO THE EXTENT REQUIRED FOR THE ENFORCEABILITY OF THIS PROVISION.
            </p>
            <p className="dd text-lg caliber-regular mb-4 dark-gray-color">
              <b>c.	Pre-Arbitration Dispute Resolution</b>
            </p>
            <p className="dd text-lg caliber-regular mb-4 dark-gray-color">
              Verbena is always interested in resolving disputes amicably and efficiently, and most customer concerns can be resolved quickly and to the customer’s satisfaction by emailing Verbena’s customer support at info@verbenacare.com.  If such efforts prove unsuccessful, a party who intends to seek arbitration must first send to the other, by certified mail, a written Notice of Dispute (“Notice”).  The Notice to Verbena should be sent to:
            </p>
            <p className="dd text-lg caliber-regular mb-4 dark-gray-color">
              <b>(“Notice Address”).</b>
            </p>
            <p className="dd text-lg caliber-regular mb-4 dark-gray-color">
              The Notice must (i) describe the nature and basis of the claim or dispute and (ii) set forth the specific relief sought.  If Verbena and you do not resolve the claim within sixty (60) calendar days after the Notice is received, you or Verbena may commence an arbitration proceeding.  During the arbitration, the amount of any settlement offer made by Verbena or you shall not be disclosed to the arbitrator until after the arbitrator determines the amount, if any, to which you or Verbena is entitled.
            </p>
            <p className="dd text-lg caliber-regular mb-4 dark-gray-color">
              <b>d.	Arbitration Procedures</b>
            </p>
            <p className="dd text-lg caliber-regular mb-4 dark-gray-color">
              Arbitration will be conducted by a neutral arbitrator in accordance with the American Arbitration Association’s <b>(“AAA”)</b> rules and procedures, including the AAA’s Consumer Arbitration Rules (collectively, the <b>“AAA Rules”</b>), as modified by this Arbitration Agreement.  For information on the AAA, please visit its website, http://www.adr.org.  Information about the AAA Rules and fees for consumer disputes can be found at the AAA’s consumer arbitration page, http://www.adr.org/consumer_arbitration.  If there is any inconsistency between any term of the AAA Rules and any term of this Arbitration Agreement, the applicable terms of this Arbitration Agreement will control unless the arbitrator determines that the application of the inconsistent Arbitration Agreement terms would not result in a fundamentally fair arbitration.  The arbitrator must also follow the provisions of these Terms of Service as a court would.  All issues are for the arbitrator to decide, including, but not limited to, issues relating to the scope, enforceability, and arbitrability of this Arbitration Agreement.  Although arbitration proceedings are usually simpler and more streamlined than trials and other judicial proceedings, the arbitrator can award the same damages and relief on an individual basis that a court can award to an individual under the Terms of Service and applicable law.  Decisions by the arbitrator are enforceable in court and may be overturned by a court only for very limited reasons.
            </p>
            <p className="dd text-lg caliber-regular mb-4 dark-gray-color">
              Unless Verbena and you agree otherwise, any arbitration hearings will take place in San Francisco, California.  If your claim is for $10,000 or less, Verbena agrees that you may choose whether the arbitration will be conducted solely on the basis of documents submitted to the arbitrator, through a telephonic hearing, or by an in-person hearing as established by the AAA Rules.  If your claim exceeds $10,000, the right to a hearing will be determined by the AAA Rules.  Regardless of the manner in which the arbitration is conducted, the arbitrator shall issue a reasoned written decision sufficient to explain the essential findings and conclusions on which the award is based.
            </p>
            <p className="dd text-lg caliber-regular mb-4 dark-gray-color">
              <b>e.	Costs of Arbitration</b>
            </p>
            <p className="dd text-lg caliber-regular mb-4 dark-gray-color">
              Payment of all filing, administration, and arbitrator fees (collectively, the <b>“Arbitration Fees”</b>) will be governed by the AAA Rules, unless otherwise provided in this Arbitration Agreement.  If the value of the relief sought is $75,000 or less, at your request, Verbena will pay all Arbitration Fees.  If the value of relief sought is more than $75,000 and you are able to demonstrate to the arbitrator that you are economically unable to pay your portion of the Arbitration Fees or if the arbitrator otherwise determines for any reason that you should not be required to pay your portion of the Arbitration Fees, Verbena will pay your portion of such fees.  In addition, if you demonstrate to the arbitrator that the costs of arbitration will be prohibitive as compared to the costs of litigation, Verbena will pay as much of the Arbitration Fees as the arbitrator deems necessary to prevent the arbitration from being cost-prohibitive.  Any payment of attorneys’ fees will be governed by the AAA Rules.
            </p>
            <p className="dd text-lg caliber-regular mb-4 dark-gray-color">
              <b>f.	Confidentiality</b>
            </p>
            <p className="dd text-lg caliber-regular mb-4 dark-gray-color">
              All aspects of the arbitration proceeding, and any ruling, decision, or award by the arbitrator, will be strictly confidential for the benefit of all parties.
            </p>
            <p className="dd text-lg caliber-regular mb-4 dark-gray-color">
              <b>g.	Severability</b>
            </p>
            <p className="dd text-lg caliber-regular mb-4 dark-gray-color">
              If a court or the arbitrator decides that any term or provision of this Arbitration Agreement (other than the subsection (b) titled “Prohibition of Class and Representative Actions and Non-Individualized Relief” above) is invalid or unenforceable, the parties agree to replace such term or provision with a term or provision that is valid and enforceable and that comes closest to expressing the intention of the invalid or unenforceable term or provision, and this Arbitration Agreement shall be enforceable as so modified.  If a court or the arbitrator decides that any of the provisions of subsection (b) above titled “Prohibition of Class and Representative Actions and Non-Individualized Relief” are invalid or unenforceable, then the entirety of this Arbitration Agreement shall be null and void, unless such provisions are deemed to be invalid or unenforceable solely with respect to claims for public injunctive relief.  The remainder of the Terms of Service will continue to apply.
            </p>
            <p className="dd text-lg caliber-regular mb-4 dark-gray-color">
              <b>h.	Future Changes to Arbitration Agreement</b>
            </p>
            <p className="dd text-lg caliber-regular mb-4 dark-gray-color">
              Notwithstanding any provision in these Terms of Service to the contrary, Verbena agrees that if it makes any future change to this Arbitration Agreement (other than a change to the Notice Address) while you are a user of the Services, you may reject any such change by sending Verbena written notice within thirty (30) calendar days of the change to the Notice Address provided above.  By rejecting any future change, you are agreeing that you will arbitrate any dispute between us in accordance with the language of this Arbitration Agreement as of the date you first accepted these Terms of Service (or accepted any subsequent changes to these Terms of Service).
            </p>
            <h3 className="mb-3">
              Termination
            </h3>
            <p className="dd text-lg caliber-regular mb-4 dark-gray-color">
              You agree that Verbena, in its sole discretion, may suspend, limit, condition or terminate your account, use of the Services or any feature or function thereof and remove and discard any content within the Services, for any reason, including, without limitation, for lack of use or if Verbena believes that you have violated or acted inconsistently with the letter or spirit of these Terms of Service.  Any suspected fraudulent, abusive or illegal activity that may be grounds for termination of your use of Services may be referred to appropriate law enforcement authorities.  Verbena may also in its sole discretion and at any time discontinue providing the Services, or any part thereof, with or without notice.  You agree that, except as may be explicitly set forth herein, any termination of your access to the Services under any provision of these Terms of Service may be effected without prior notice, and acknowledge and agree that Verbena may immediately deactivate or delete your account and all related information and files in your account and/or bar any further access to such files or the Services.  Further, you agree that Verbena will not be liable to you or any third party for any termination of your access to the Services (except as may be explicitly set forth herein).
            </p>
            <h3 className="mb-3">
              General
            </h3>
            <p className="dd text-lg caliber-regular mb-4 dark-gray-color">
              These Terms of Service constitute the entire agreement between you and Verbena and govern your use of the Service, superseding any prior agreements between you and Verbena with respect to the Services.  You also may be subject to additional terms and conditions that may apply when you use affiliate or Third Party Services, third party content or third party software.  These Terms of Service will be governed by the laws of the State of California without regard to its conflict of law provisions.  With respect to any disputes or claims not subject to arbitration, as set forth above, you and Verbena agree to submit to the personal and exclusive jurisdiction of the state and federal courts located within San Francisco, California.  The failure of Verbena to exercise or enforce any right or provision of these Terms of Service will not constitute a waiver of such right or provision.  If any provision of these Terms of Service is found by a court of competent jurisdiction to be invalid, the parties nevertheless agree that the court should endeavor to give effect to the parties’ intentions as reflected in the provision, and the other provisions of these Terms of Service remain in full force and effect.  You agree that regardless of any statute or law to the contrary, any claim or cause of action arising out of or related to use of the Service or these Terms of Service must be filed within one (1) year after such claim or cause of action arose or be forever barred.  A printed version of this agreement and of any notice given in electronic form will be admissible in judicial or administrative proceedings based upon or relating to this agreement to the same extent and subject to the same conditions as other business documents and records originally generated and maintained in printed form.  You may not assign these Terms of Service without the prior written consent of Verbena, but Verbena may assign or transfer these Terms of Service, in whole or in part, without restriction.  The section titles in these Terms of Service are for convenience only and have no legal or contractual effect.  Notices to you may be made via either email or regular mail.  The Services may also provide notices to you of changes to these Terms of Service or other matters by displaying notices or links to notices generally on the Services.
            </p>
            <h3 className="mb-3">
              Notice for California Users
            </h3>
            <p className="dd text-lg caliber-regular mb-4 dark-gray-color">
              Under California Civil Code Section 1789.3, users of the Service from California are entitled to the following specific consumer rights notice: The Complaint Assistance Unit of the Division of Consumer Services of the California Department of Consumer Affairs may be contacted in writing at 1625 North Market Blvd., Suite N 112, Sacramento, CA 95834, or by telephone at (916) 445-1254 or (800) 952-5210.  You may contact us at:
            </p>
            <h3 className="mb-3">
              Questions?  Concerns?  Suggestions?
            </h3>
            <p className="dd text-lg caliber-regular mb-4 dark-gray-color">
              Please contact us to report any violations of these Terms of Service or to pose any questions regarding these Terms of Service or the Services:By mail:
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default TermsAndServicesForm;
