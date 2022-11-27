
const DEFAULT_PAGE_STATE = {
    temp: '',
    curPage: 1, 
    yPosition: 0,
    size: 10
}

async function enterPage(){
    const pageState = getHistoryPageState(window.history.state);

    if(!pageState.temp) {
        await getTemp(pageState);
    }

    document.append(pageState.temp);
    window.yPosition = pageState.yPosition;
}

function onClickMoreBtn(){
    const {temp, curPage, yPosition} = getHistoryPageState();

    const nextPage = curPage + 1;
    mergeHistoryState({curPage: nextPage});

    const data = await createData({curPage: getHistoryPageState().curPage, pageSize: SIZE});

}

async function hasPagingHistoryState(){
    return !!window.history.state && !!window.history.state.temp;
}

async function getTemp(pageState){
  
    const data = await createData({curPage: pageSize.curPage: SIZE});
    const temp = createTemp(data);

    mergeHistoryState({temp, curPage, temp});

    document.body.append(temp);
}


async function createData({curPage, pageSize}){
    const _data = Array(pageSize);
    data = _data.map((e, i) => (i + 1) + (pageSize * (curPage - 1)));

    return data;
}

function createTemp(data) {
    let temp ='';
    data.forEach(element => {
        temp += `This is item number ${element}.`;
    });
}

function mergeHistoryState(obj){
    const {prevTemp = temp} = getHistoryPageState();
    obj.temp = obj.temp + prevTemp;

    window.history.replaceState(Object.assign(window.history.state, obj), '');
}

function getHistoryPageState(historyState){
    if(!historyState && !historyState.temp){
        return {temp, curPage, yPosition} = historyState;
    }else{
        return DEFAULT_PAGE_STATE;
    }
}
