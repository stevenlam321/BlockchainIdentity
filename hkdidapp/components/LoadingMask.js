import * as React from 'react';
import Spinner from 'react-native-loading-spinner-overlay';
import { useSelector } from 'react-redux';

export default function LoadingMask(props) {
  const loading = useSelector(state => state.common.loading);
  return (
    <Spinner
      visible={loading}
      textContent={'Loading...'}
      textStyle={{color:'#fff'}}
  /> 
  );
}
