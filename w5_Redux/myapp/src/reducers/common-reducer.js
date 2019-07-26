
const initialState = {
  showTabbar:true,

  // 测试用
  testNum:1
}

export default function(state=initialState, action) {
  switch (action.type) {
    case 'CHANGE_BAR_STATUS':
      return {
        ...state,
        showTabbar: action.payload
      }
    
      // 测试用
    case 'DO_TEST':
        return {
          ...state,
          testNum:state.testNum+1
        }
    default:
      return state;
  }
}