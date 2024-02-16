"use client";
import { yupResolver } from "@hookform/resolvers/yup";
import Image from "next/image";
import Link from "next/link";
import { Controller, useForm } from "react-hook-form";
import * as yup from "yup";

const schema = yup.object().shape({
  text: yup.string().required("Review is required"),
});

function SingleBlog() {
  //   const router = useRouter();
  //   const id = router.query.id as string;
  // const { data: blogDatas } = useBlogByIdQuery(id);
  // const blogData = blogDatas?.data;
  // const { id: userId } = getUserInfo() as any;
  // const [createReview, { data, status }] = useCreateReviewMutation();

  const { handleSubmit, control, reset, formState } = useForm({
    resolver: yupResolver(schema),
  });
  const { errors } = formState;

  const onSubmit = async (data: any) => {
    // !userId ? alert("Please Login first!") : "";
    // data.userId = userId;
    // data.blogId = id;
    // try {
    //   const result = await createReview({ ...data }).unwrap();
    //   reset({
    //     text: "",
    //   });
    // } catch (err: any) {
    //   console.error(err.message, "this is error message");
    // }
  };

  return (
    <div>
      <div className="flex justify-end align-middle">
        <Link href={`/profile/`}>
          <div className="">
            <Image
              src={""}
              height={2}
              width={2}
              alt="Writer"
              className="flex w-8 h-8 rounded-full mr-2"
            />

            {/* <span>{blogData?.user.name}</span> */}
          </div>
        </Link>
      </div>
      <br />
      <br />
      <br />
      <div className="">
        <div
          className="text-gray-800 mb-4 
            dark:text-gray-300 text-2xl font-semibold"
        >
          {/* {blogData?.title} */}
        </div>
        <br />
        <div className="flex align-middle justify-center h-60 ">
          <Image
            src={""}
            height={200}
            width={200}
            // layout="responsive"
            objectFit="cover"
            alt="Writer"
            className=" rounded-lg"
          />
        </div>

        <br />
        <div className="flex ">
          {/* {blogData?.content && (
            <div dangerouslySetInnerHTML={{ __html: blogData.content }} />
          )} */}
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ducimus
          cumque quibusdam perferendis nihil velit aut? Asperiores sapiente odio
          a quidem. Eaque reiciendis at nihil odio ea tempore quod quidem
          expedita sint voluptatum quo adipisci, incidunt maxime. Possimus fugit
          fugiat dignissimos nobis consectetur, doloribus commodi aut animi
          repellendus quidem! Adipisci, nisi quas. Sequi, quaerat perferendis
          dolore libero dolorum quasi architecto explicabo nesciunt vero, optio
          vel consectetur, consequatur delectus. Nisi eveniet, placeat deleniti
          harum sint vero vitae at veritatis porro recusandae, itaque optio
          dolorem libero laboriosam hic pariatur exercitationem dicta dolore,
          ipsum aliquid quibusdam? Dolore quaerat autem numquam amet
          necessitatibus cum facere pariatur placeat et perferendis accusamus
          minus fuga suscipit tempora magnam, cupiditate totam error, a
          similique quis aut ducimus! Labore quaerat, nobis dolores ab eaque
          quia. Ea iusto maiores, pariatur dolores aliquid consequuntur, quas
          nemo, dolorum quia at corrupti? Obcaecati, doloribus. Aperiam numquam
          sint rerum tempora, aliquam fugiat maxime saepe distinctio magni,
          explicabo, dolorem porro voluptatibus laudantium aliquid laborum
          itaque dolores et ipsum nam illum praesentium expedita. Nulla amet quo
          voluptatum optio velit voluptatibus consequatur! Unde repellendus
          dolor vero minima excepturi accusamus voluptas enim, similique
          expedita quibusdam consectetur. Corrupti voluptatibus mollitia, optio
          numquam pariatur excepturi cumque recusandae eligendi reiciendis
          praesentium eos laboriosam hic aspernatur a! Maiores veritatis modi,
          quod officia, voluptatum temporibus eligendi quidem non qui dolore cum
          optio! Quia, asperiores quae? Quo dicta ad, magni voluptatum
          repellendus incidunt sed praesentium non dolor voluptate maiores
          mollitia tempore. Ut alias earum cupiditate nihil est, recusandae
          voluptatibus ipsum, impedit dolorem culpa iste cumque sit eveniet
          repellendus quidem! Beatae repudiandae corporis cumque porro hic
          laboriosam tempore saepe nulla numquam optio at ipsam, fugit incidunt
          doloribus blanditiis velit dicta, reiciendis sint molestias rerum?
          Quam fugiat odit necessitatibus, maxime, facilis illum sapiente quod
          consectetur cumque neque cupiditate atque labore alias molestiae cum
          sint sunt nemo itaque placeat voluptatem repudiandae odio. Ut a
          suscipit natus voluptatem accusantium ipsum quia sit quasi inventore,
          vero debitis ea mollitia vitae eius doloribus corporis quos soluta
          corrupti ipsam perferendis eum necessitatibus laboriosam temporibus.
          Cumque autem doloremque est aliquam eius ratione ut beatae veritatis
          aliquid adipisci voluptate, ipsam omnis incidunt? Ipsa voluptas
          consectetur eligendi quidem perspiciatis soluta unde velit labore
          voluptatibus libero aliquid quod aliquam temporibus ullam id deserunt
          sequi odio, obcaecati architecto porro repellendus? Rerum temporibus
          dolorum suscipit eveniet ducimus, perspiciatis quibusdam consectetur
          quia saepe dignissimos repellendus amet maiores accusamus, recusandae
          iure alias doloremque enim ullam obcaecati quaerat! Alias obcaecati
          similique pariatur? Amet quas soluta ipsum? Laboriosam ullam soluta
          repellat doloremque quos distinctio eum hic molestiae nobis tempore.
          Adipisci dolorem tempora eveniet, eum voluptates saepe. Quo fugit
          eaque maxime voluptatem suscipit hic exercitationem expedita eveniet
          amet quibusdam? Consectetur asperiores, nam assumenda laborum commodi
          ratione unde magnam nemo itaque et aut culpa veritatis molestiae quam
          harum, repellat impedit voluptates fugiat excepturi maiores facere,
          inventore expedita deserunt. Quod modi provident aperiam. Illum magni,
          aliquid ipsa eius expedita nemo voluptates necessitatibus tempore
          impedit accusamus sapiente soluta, ea incidunt enim vero non
          temporibus beatae. Natus, aspernatur ad. Esse provident dicta modi
          incidunt assumenda rerum enim.
        </div>
      </div>
      <br />
      <br />
      <div className="text-2xl text-center p-5">Reviews</div>
      <br />

      <div className="text-base ">
        {/* {blogData?.review.map((review: IReview, index: number) => (
          <div key={index} className=" p-4 my-4 border rounded-xl">
            {review.text}
          </div>
        ))} */}
      </div>
      <br />
      <br />
      <br />
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-4">
          <label htmlFor="text" className="block  font-semibold mb-2">
            Give Review
          </label>
          <Controller
            name="text"
            control={control}
            render={({ field }) => (
              <textarea
                {...field}
                className="border rounded-xl w-full py-2 px-3"
              />
            )}
          />
        </div>

        <button
          type="submit"
          className="bg-gray-200 border rounded-xl py-2 px-4 hover:bg-gray-300  dark:bg-gray-500 dark:hover:bg-slate-400 dark:text-white"
        >
          Review
        </button>
      </form>
    </div>
  );
}

export default SingleBlog;
