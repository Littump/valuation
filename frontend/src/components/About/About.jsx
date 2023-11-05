import { contactsData } from "../../config/contacts";
import AboutContact from "./AboutContact";
import AboutHeader from "./AboutHeader";

export default function About() {
  const contacts = contactsData.map((contact) => {
    return <AboutContact props={contact} key={contact.name} />;
  });
  return (
    <div className="mt-10 flex flex-col items-startmx-auto text-start gap-7 mx-auto max-w-4xl ">
      <AboutHeader />
      <div className=" grid grid-cols-1 max-w-xs mx-auto xs:max-w-none sm:grid-cols-2 sm:mx-10 md:mx-0 md:grid-cols-3 gap-8 mt-10 text-start">
        {contacts}
      </div>
    </div>
  );
}