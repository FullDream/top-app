import { GetStaticProps } from "next";
import { useState } from "react";
import axios from "axios";
import { Button, Htag, P, Rating, Tag } from "../components";
import { withLayout } from "../layout/Layout";
import { MenuItem } from "../interfaces/menu.interface";

function Home({menu, firstCategory}): JSX.Element {
  const [rating, setRating] = useState<number>(2);

  return (
    <>
      <Htag tag='h1'> текст</Htag>
      <Button appearance='primary' arrow='none'>Button</Button>
      <Button appearance='ghost' arrow='right'>Button</Button>
      <P>ofdkflkselfkselfklfklfsekl</P>
      <Tag size='normal'>ddd</Tag>
      <Tag color='primary'>dsddds</Tag>
      <Rating rating={rating} isEditable setRating={setRating} />
      <ul>
        {menu.map(m => (<li key={m._id.secondCategory}>{m._id.secondCategory}</li>))}
      </ul>
    </>
  );
}

export default withLayout(Home);

export const getStaticProps: GetStaticProps<HomeProps> = async () => {
  const firstCategory = 0;
  const { data: menu } = await axios.post<MenuItem[]>(process.env.NEXT_PUBLIC_DOMAIN + '/api/top-page/find', {firstCategory});
  return {
    props: {
      menu,
      firstCategory
    }
  };
};


interface HomeProps extends Record<string, unknown> {
  menu: MenuItem[];
  firstCategory: number;
}