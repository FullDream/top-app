import { GetStaticProps } from "next";
import { useState } from "react";
import axios from "axios";
import { Button, Htag, Input, P, Rating, Search, Tag } from "../components";
import { withLayout } from "../layout/Layout";
import { MenuItem } from "../interfaces/menu.interface";
import { API } from "../helpers/api";

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
      <Input></Input>
      
      
    </>
  );
}

export default withLayout(Home);

export const getStaticProps: GetStaticProps<HomeProps> = async () => {
  const firstCategory = 0;
  const { data: menu } = await axios.post<MenuItem[]>(API.topPage.find, {firstCategory});
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