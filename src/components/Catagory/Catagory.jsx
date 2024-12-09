import React from "react";
import { categoryInfos } from "./CatagoryData";
import CategoryCard from "./CatagoryCard";
import styles from "./Catagory.module.css";
function Category() {
    return (
        <section className={styles.category__container}>
        {categoryInfos.map((infos) => (
            <CategoryCard key={infos.name} data={infos} />
        ))}
        </section>
    );
}

export default Category;