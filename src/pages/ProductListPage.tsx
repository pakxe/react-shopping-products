import Header from '@/components/Header/Header';
import Title from '@/components/common/Title/Title';
import Dropdown from '@/components/common/Dropdown/Dropdown';
import Flex from '@/components/common/Flex/Flex';
import { CATEGORY_OPTION_LIST, FILTER_OPTION_LIST } from '@/constants/filter';
import ProductList from '@/components/ProductList/ProductList';
import useProductList from '@/hooks/useProductList';
import { useRef } from 'react';
import { useObserver } from '@/hooks/useObserver';
import styles from './ProductListPage.module.css';
import CartIcon from '@/components/CartIcon/CartIcon';

export default function ProductListPage() {
  const { productList, handleCategory, handleSortType, loading, error, fetchNextPage, page } =
    useProductList();

  let bottom = useRef(null);

  const onIntersect = ([entry]: IntersectionObserverEntry[]) =>
    !loading && entry.isIntersecting && fetchNextPage();

  useObserver({
    target: bottom,
    onIntersect,
  });

  return (
    <div className={styles.container}>
      <Header leftComponent={<h1>SHOP</h1>} rightComponent={<CartIcon />} />
      <Flex gap={20} direction="column">
        <Title title="안녕하세요 나는 타이틀" />
        <Flex gap={24} direction={'row'}>
          <Dropdown optionList={CATEGORY_OPTION_LIST} onChange={handleCategory} />
          <Dropdown optionList={FILTER_OPTION_LIST} onChange={handleSortType} />
        </Flex>
        <ProductList productList={productList} />
      </Flex>
      <div
        style={{
          height: '200px',
          backgroundColor: 'pink',
        }}
        ref={bottom}
      />
      <div>{loading ? 'true' : 'false'}</div>
    </div>
  );
}
