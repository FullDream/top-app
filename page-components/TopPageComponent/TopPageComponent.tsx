import { Card, Htag, Tag, HhData, Advantages, P, Sort, Product, Up } from "../../components";
import { TopPageComponentProps } from "./TopPageComponent.props";

import styles from './TopPageComponent.module.css';
import { TopLevelCategory } from "../../interfaces/page.interface";
import { SortEnum } from "../../components/Sort/Sort.props";
import { useEffect, useReducer } from "react";
import { sortReducer } from "./sort.reducer";


export const TopPageComponent = ({ page, products, firstCategory }: TopPageComponentProps): JSX.Element => {

    const [{products: sortedPoducts, sort}, dispathSort] = useReducer(sortReducer, {products, sort: SortEnum.Rating});

    const setSort = (sort: SortEnum) => {
        dispathSort({type: sort});
    };

    useEffect(() => {
        dispathSort({type: 'reset', initialState: products});
    }, [products]);

    return (
        <div className={styles.wrapper}>
            <div className={styles.title}>
                <Htag tag='h1'>{page.title}</Htag>
                {products && <Tag color='grey' size='big'>{products.length}</Tag>}
                <Sort sort={sort} setSort={setSort}/>
            </div>

            <div>
                {sortedPoducts && sortedPoducts.map(p => (<Product layout key={p._id} product={p}/>))}
            </div>
            <div className={styles.title}>
                <Htag tag='h2'>Вакансии - {page.category}</Htag>
                <Tag color='red' size='big'>hh.ru</Tag>
            </div>
            {firstCategory == TopLevelCategory.Courses && <HhData {...page.hh} />}
            {
                page.advantages && page.advantages.length > 0 && <>
                    <Htag tag='h2'>Преимущества</Htag>
                    <Advantages advantages={page.advantages} />
                </>
            }
            {page.seoText && <div className={styles.seo} dangerouslySetInnerHTML={{__html: page.seoText}}/>}
            <Htag tag='h2'>Получаемые навыки</Htag>
            {page.tags.map((t, i) => <Tag key={i} color='primary' >{t}</Tag>)}

        </div>

    );
};
