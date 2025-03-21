function ContactPage() {
  return (
    <div className="w-full h-screen text-center md:flex-row  flex flex-col md:overflow-auto overflow-y-scroll ">
      <div className="p-4 md:w-3/4">
        <h1 className="font-extrabold text-4xl ">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Officiis
        </h1>
        <p className=" my-6 text-xl">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Assumenda,
          placeat. Unde officia nesciunt voluptatibus blanditiis sunt
          consectetur doloremque! Omnis possimus cumque velit unde nobis,
          numquam id, molestias tempora sit deleniti, et reprehenderit mollitia
          similique eius excepturi esse. Reprehenderit molestias nam, rerum
          accusantium vitae impedit doloribus architecto aliquam praesentium,
          dicta recusandae?
        </p>
        <p className="text-xl">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Iusto culpa
          vel, magni, sed, sapiente dignissimos optio numquam inventore
          accusamus ex error vitae eligendi nobis recusandae nisi. Aut ut,
          dignissimos quo voluptas tempora eaque recusandae et, modi molestias
          placeat vero aliquam neque culpa saepe magni ad. Amet voluptates quod
          voluptatum vel.
        </p>
        <p className="my-2 font-extrabold text-xl">
          Email:blogob3244@gmail.com
        </p>
        <p className="font-extrabold text-xl">Contact Number</p>
        <p className="font-extrabold text-xl">+12398723943,+3298737992</p>
      </div>
      <div className=" rounded-full border-2 md:overflow-hidden ">
        <img
          src="https://res.cloudinary.com/dj5yf27lr/image/upload/v1741165804/blogsImages/wpcq7pq4x4fqqaoafjzc.jpg"
          alt="contact image"
          className="h-full w-full"
        />
      </div>
    </div>
  );
}

export default ContactPage;
