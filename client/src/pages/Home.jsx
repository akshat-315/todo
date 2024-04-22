import image from "../assets/Image.png"

const Home = () => {
  return (
    <div className="bg-[#2D2E2D] min-h-screen flex justify-center items-center">
      <div className="flex gap-20">
        <div className=" sm:text-base w-1/2 flex flex-col gap-10 text-gray-100 animate-pulse px-20 text-xl  ">
          <h2>
            All your tasks in one place <span>...</span>
          </h2>
          <h2>Organize your work and life, finally.</h2>
          <h2>Get started with the todo by clicking on the Sign In button.</h2>
          <h2>If you are new, get started by Registering your account!</h2>
        </div>
        <div className="w-1/2">
          <div>
            <img src={image} width={200} height={200}/>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
