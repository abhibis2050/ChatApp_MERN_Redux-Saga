
import Logo from "../assets/chatlogo.png"

const ChatPage = () => {
  return (
    <div className="bg-bluebase w-full h-screen flex fixed">
      {/* sidebar */}
      <div className=" w-[15%]">
        {/* logo */}
        <div>
        <img src={Logo}/>
        </div>
        {/* all other button */}
        <div  className="border border-white">
        all other button
        </div>
        {/* logout */}
        <div  className="border border-white">
        logout
        </div>
      </div>
      {/* contact and chat area */}
      <div className="bg-slate-200 flex space-x-4 w-[85%] rounded-3xl m-4 ">
        {/* contact */}
        <div className="bg-white w-1/5 rounded-3xl">hello</div>
        {/* chat */}
        <div className="bg-gray-600 w-4/5 rounded-3xl space-y-3">
          {/* header profile */}
          <div className="bg-white mx-4 rounded-3xl py-4 px-4 h-[10%] mt-3">
            hello
          </div>
          {/*chat messages area */}
          <div className="bg-white mx-4 rounded-3xl py-4 px-4 h-[70%]">
            hello
          </div>
          {/* send messgae area*/}
          <div className="bg-white mx-4 rounded-3xl py-5 px-4 h-[12%] mb-2">hello</div>
        </div>
      </div>
    </div>
  );
};

export default ChatPage;
