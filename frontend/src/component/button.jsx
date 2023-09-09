import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
export const ButtonComponent = ({ label, onClick, icon }) => {
  return (
    <div
      onClick={onClick}
      className={`flex bg-white py-2 px-4 text-red-500 text-xl font-semibold rounded-3xl space-x-4 hover:bg-red-100 `}
    >
      <div>
        <FontAwesomeIcon icon={icon} />
      </div>
      <div className="w-full">
        <div className="flex justify-between w-full">
          <h1>{label}</h1>
        </div>
      </div>
    </div>
  );
};
