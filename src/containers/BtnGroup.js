import { connect } from 'react-redux';
import BtnGroup from '../components/BtnGroup';

function mapStateToProps(state) {
  // stateの情報を定数に入れてreturnによりToPropsする
  const { tagAll, isFetching, isError } = state.tags;
  return {
    tagAll,
    isFetching,
    isError
  };
}

// mapStateToPropsやmapDispatchToPropsなどをstoreに格納する
// BtnGroupコンポーネントからstore内のstateにアクセスが可能になる
export default connect(mapStateToProps)(BtnGroup);
