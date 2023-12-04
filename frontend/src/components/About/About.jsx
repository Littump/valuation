import { contactsData, partnerData } from "../../config/contacts";
import AboutContact from "./AboutContact";
import AboutHeader from "./AboutHeader";
import PartnerComponent from "./PartnerComponent";

export default function About() {
  const contacts = contactsData.map((contact) => {
    return <AboutContact props={contact} key={contact.name} />;
  });
  const partners = partnerData.map((partner) => {
    return (
      <PartnerComponent
        name={partner?.name}
        logo={partner?.logo}
        key={partner?.name}
      />
    );
  });
  return (
    <div className="mt-10 w-full flex flex-col items-start text-start gap-7 mx-auto max-w-4xl ">
      <AboutHeader />
      <div className=" grid grid-cols-1 max-w-xs mx-auto xs:max-w-xs sm:max-w-none sm:grid-cols-2 px-6 lg:px-0 lg:grid-cols-3 gap-8 mt-10 text-start">
        {contacts}
      </div>
      <div className="mx-auto mt-20 mb-4 text-2xl flex justify-center flex-col items-center gap-2 dark:text-gray font-semibold text-black ">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
          />
        </svg>
        Наши партнёры
      </div>
      <div className="w-full flex justify-center items-start gap-4 mb-10">
        {partners}
      </div>
    </div>
  );
}
