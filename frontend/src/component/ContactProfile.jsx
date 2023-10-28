import { useSelector } from "react-redux";
import ContactImage from "../assets/contact.png";

const ContactProfile = () => {
  const { selectedContact } = useSelector((state) => state.user);
  console.log(selectedContact);
  return (
    <>
      <div className="h-full bg-white space-y-2 rounded-3xl p-2">
        {selectedContact ? (
          <div className="h-full flex justify-center">
            <img src={ContactImage} className="h-full" />
          </div>
        ) : (
          <>
            <div className="bg-blue-200 rounded-3xl h-[9%] flex justify-between px-4 items-center">
              <div>other details</div>
              <div>
                <div>buttons</div>
              </div>
            </div>
            <div className="bg-red-200 rounded-3xl h-[90%]">hello</div>
          </>
        )}
      </div>
    </>
  );
};

export default ContactProfile;
