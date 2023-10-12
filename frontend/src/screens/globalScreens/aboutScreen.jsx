import aboutUs from "../../assets/screenAssets/aboutUs.jpg";

function AboutPage() {
  return (
    <>
      <div className=" w-11/12">
        <img src={aboutUs} alt="about Us" />
      </div>
      <div className="flex flex-col gap-6 md:text-start text-center md:px-0 px-2">
        <h1 className="text-2xl my-4">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab, aliquid.
        </h1>
        <p>
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Blanditiis
          ut rem, aut assumenda repellat, labore aspernatur possimus porro
          reiciendis, explicabo obcaecati fugit veniam animi id accusamus ab
          consequuntur ipsum delectus atque facilis dolorem est aperiam. Vel
          similique perferendis aperiam tempora beatae blanditiis nemo qui ex
          mollitia, illum nobis voluptatem quam!
        </p>
        <h1 className="md:text-4xl text-xl">Lorem ipsum dolor sit amet.</h1>
        <p>
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Pariatur
          assumenda, nam voluptates quas esse totam fuga temporibus sed eos
          dolorem eligendi ipsam cumque numquam repudiandae suscipit voluptas
          amet ad velit blanditiis nihil et atque voluptatem. Labore harum
          possimus numquam quae officia veritatis. Obcaecati recusandae quod sit
          ab natus repellendus earum!
        </p>
      </div>
    </>
  );
}

export default AboutPage;
