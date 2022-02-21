import 'tailwindcss/tailwind.css';
import { Tab, Transition, Dialog } from '@headlessui/react';
import React, { useState, useEffect, Fragment, useRef } from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-enterprise';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
// window.electron.store.set('foo', 'bar');
// // or
// console.log(window.electron.store.get('foo'));
declare global {
  interface Window {
    electronAPI: {
      browser: {
        get: (key: string) => any;
        set: (key: string, val: any) => void;
        // any other methods you've defined...
      };
    };
  }
}

const cellEditorSelector = (params: any) => {
  console.log(params.colDef.field);
  // if (params.colDef.field === 'profile') {
  //   console.log('Hello');
  //   return {
  //     component: 'agRichSelectCellEditor',
  //     params: {
  //       values: ['Profile 1', 'Profile 2'],
  //     },
  //   };
  // }

  return undefined;
};
function App() {
  function saveProfileData(data: any[]) {
    window.electronAPI.browser.set('browser', data);
  }
  const [tabs] = useState([
    {
      content: 'Tạo profile',
    },
    {
      content: 'Reg TK ads',
    },
    {
      content: 'Auto lên cam',
    },
    {
      content: 'Auto kháng',
    },
    {
      content: 'Auto log in',
    },
    {
      content: 'Nuôi tài khoản',
    },
  ]);
  const gridRef: any = useRef();
  const [index, setIndex] = useState(0);
  const [rowData, setRowData] = useState([
    {
      profilePath: 'Toyota',
      name: 'Celica',
      proxy: 'proxy',
      userAgent: 'ua',
      websiteTarget: 'web',
    },
    {
      profilePath: 'Toyota',
      name: 'Celica',
      proxy: 'proxy',
      userAgent: 'ua',
      websiteTarget: 'web',
    },
    {
      profilePath: 'Toyota',
      name: 'Celica',
      proxy: 'proxy',
      userAgent: 'ua',
      websiteTarget: 'web',
    },
    {
      profilePath: 'Toyota',
      name: 'Celica',
      proxy: 'proxy',
      userAgent: 'ua',
      websiteTarget: 'web',
    },
    {
      profilePath: 'Toyota',
      name: 'Celica',
      proxy: 'proxy',
      userAgent: 'ua',
      websiteTarget: 'web',
    },
  ]);
  const [rangeSelected, setRangeSelected] = useState([0, 0]);
  const [selectionSelected, setSelectionSelected] = useState([]);
  const [display, setDisplay] = useState(false);
  const [columnDefs] = useState([
    // { field: "pick", headerName: "Chọn", checkboxSelection: true },
    {
      field: 'profilePath',
      headerName: 'Folder',
      sortable: true,
      filter: true,
      editable: true,
      checkboxSelection: true,
      headerCheckboxSelection: true,
    },
    {
      field: 'name',
      headerName: 'Tên profile',
      sortable: true,
      filter: true,
      editable: true,
      cellEditorSelector,
      cellEditorPopup: true,
    },
    {
      field: 'proxy',
      headerName: 'Proxy',
      sortable: true,
      filter: true,
      editable: true,
    },
    {
      field: 'userAgent',
      headerName: 'UA',
      sortable: true,
      filter: true,
      editable: true,
    },
    {
      field: 'websiteTarget',
      headerName: 'Web đích',
      sortable: true,
      filter: true,
      editable: true,
    },
  ]);
  const [profile, setProfile] = useState({
    userAgent: 'allRandom',
    runDataNumber: 0,
    startFrom: 0,
    thread: 0,
    delay: 0,
    website: '',
    import: 'manual',
    output: '',
  });
  const [typeSelect, setTypeSelect] = useState('selection');
  const [isOpen, setIsOpen] = useState(false);

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }
  // const userAgentChange = (e: any) => {
  //   setProfile({ ...profile, userAgent: e.target.value });
  //   if (e.target.value == 'manual') {
  //     setDisplay(true);
  //   } else {
  //     setDisplay(false);
  //   }
  // };
  const getContextMenuItems = (params: any) => {
    const result = [
      {
        // custom item
        name: 'Random Auto From Selection',
        action() {
          setIsOpen(true);
          if (typeSelect === 'selection') console.log(selectionSelected);
          else console.log(rangeSelected[0], rangeSelected[1]);
        },
        cssClasses: ['font-bold'],
      },
      {
        // custom item
        name: 'Random Auto All ',
        action() {
          if (typeSelect === 'selection') console.log(selectionSelected);
          else console.log(rangeSelected[0], rangeSelected[1]);
        },
        cssClasses: ['font-bold'],
      },
      'copy',
    ];
    return result;
  };
  const rangeChanged = (params: any) => {
    setRangeSelected([
      params.api.getCellRanges()[0].startRow.rowIndex,
      params.api.getCellRanges()[0].endRow.rowIndex,
    ]);
    setTypeSelect('range');
  };
  const selectionChange = (params: any) => {
    const selectionArr = params.api
      .getSelectedNodes()
      .map((p: any) => p.rowIndex);
    setSelectionSelected(selectionArr);
    setTypeSelect('selection');
  };
  // const [data, setData] = useState([]);
  // useEffect(() => {
  //   async function callData() {

  //     // let res = await getAllProfile({});
  //     // @ts-ignore
  //     setData(res || rowData);
  //   }
  //   callData();
  // }, [tabs]);
  // const runDataNumberChange = (e: any) => {
  //   setProfile({ ...profile, runDataNumber: e.target.value });
  // };
  // const startFromChange = (e: any) => {
  //   setProfile({ ...profile, startFrom: e.target.value });
  // };
  // const threadChange = (e: any) => {
  //   setProfile({ ...profile, thread: e.target.value });
  // };
  // const delayChange = (e: any) => {
  //   setProfile({ ...profile, delay: e.target.value });
  // };
  // const websiteChange = (e: any) => {
  //   setProfile({ ...profile, website: e.target.value });
  // };
  // const importChange = (e: any) => {
  //   setProfile({ ...profile, import: e.target.value });
  // };
  // const outputChange = (e: any) => {
  //   setProfile({ ...profile, output: e.target.value });
  // };
  const processDataFromClipboard = (params: any) => {
    const emptyLastRow =
      params.data[params.data.length - 1][0] === '' &&
      params.data[params.data.length - 1].length === 1;
    if (emptyLastRow) {
      params.data.splice(params.data.length - 1, 1);
    }
    const { api, columnApi } = gridRef.current;
    const lastIndex = api.getModel().rowsToDisplay.length - 1;
    const focusedCell = api.getFocusedCell();
    const focusedIndex = focusedCell.rowIndex;
    if (focusedIndex + params.data.length - 1 > lastIndex) {
      const resultLastIndex = focusedIndex + (params.data.length - 1);
      const addRowCount = resultLastIndex - lastIndex;
      let rowsToAdd = [];
      let addedRows = 0;
      let currIndex = params.data.length - 1;
      while (addedRows < addRowCount) {
        rowsToAdd.push(params.data.splice(currIndex, 1)[0]);
        addedRows += 1;
        currIndex -= 1;
      }
      rowsToAdd = rowsToAdd.reverse();
      const newRowData: any = [];
      rowsToAdd.map((r) => {
        const row: any = {};
        let currColumn: any = focusedCell.column;
        r.map((i: any) => {
          row[currColumn.colDef.field] = i;
          currColumn = columnApi.getDisplayedColAfter(currColumn);
        });
        newRowData.push(row);
      });
      newRowData.push({
        profilePath: 'Empty',
        name: '',
        proxy: '',
        userAgent: '',
        websiteTarget: '',
      });
      api.updateRowData({ add: newRowData });
      setRowData(api.getModel().rowsToDisplay.map((p: any) => p.data));
    }
    return params.data;
  };

  return (
    <div className="mt-2">
      <div className="grid grid-cols-5 mx-10">
        <div className="flex justify-center">
          {/* <img src={avatarImg} className="w-10 h-10 mb-2" /> */}
          <button
            type="button"
            onClick={() => {
              console.log(rowData);
            }}
          >
            Click{' '}
          </button>
        </div>
      </div>
      <Tab.Group>
        <Tab.List className="grid grid-cols-6 mx-10 border-r border-b border-t bg-blue-700 rounded-xl p-1">
          {tabs.map((tab, i) => (
            <Tab
              key={i}
              className={({ selected }) =>
                `w-full py-2 text-sm leading-5 font-medium rounded-lg focus:outline-none focus:ring-2 ring-offset-2 ring-offset-blue-400 ring-white ring-opacity-60 ${
                  selected
                    ? 'bg-white shadow text-blue-700'
                    : 'text-blue-100 hover:bg-white/[0.12] hover:text-white'
                }`
              }
            >
              <button
                type="button"
                onClick={() => {
                  setIndex(i);
                }}
              >
                {tab.content}
              </button>
            </Tab>
          ))}
          {/* <Tab className={({selected}) => `border-l p-2  flex flex-col items-center ${selected ? "bg-slate-500" : 'bg-white'}`}>
            <div>
              <img src={avatarImg} className="w-20 h-20 mb-2" />
            </div>
            <div>Tab 1</div>
          </Tab>
          <Tab className={({selected}) => `border-l p-2  flex flex-col items-center ${selected ? "bg-slate-500" : 'bg-white'}`}>
            <div>
              <img src={avatarImg} className="w-20 h-20 mb-2" />
            </div>
            <div>Tab 1</div>
          </Tab>
          <Tab className={({selected}) => `border-l p-2  flex flex-col items-center ${selected ? "bg-slate-500" : 'bg-white'}`}>
            <div>
              <img src={avatarImg} className="w-20 h-20 mb-2" />
            </div>
            <div>Tab 1</div>
          </Tab>
          <Tab className={({selected}) => `border-l p-2  flex flex-col items-center ${selected ? "bg-slate-500" : 'bg-white'}`}>
            <div>
              <img src={avatarImg} className="w-20 h-20 mb-2" />
            </div>
            <div>Tab 1</div>
          </Tab> */}
        </Tab.List>
        <Tab.Panels className="mx-10 text-sm">
          <Tab.Panel>
            {/* <div className="border border-gray-300 rounded-lg mt-5 p-10">
              <form className="space-y-4">
                <div className="grid grid-cols-4">
                  <label className="col-span-1 flex items-center">
                    User-Agent
                  </label>
                  <select defaultValue="allRandom" value={profile.userAgent} onChange={userAgentChange} className="col-span-2">
                    <option value="allRandom">Random từ tất cả</option>
                    <option value="selectRandom">Random tùy chọn</option>
                    <option value="import">Import UA tùy chọn</option>
                    <option value="manual">Tự nhập tay vào</option>
                  </select>
                  <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border rounded ml-3">
                    Import user agent
                  </button>
                </div>
                {display && (
                  <div className='grid grid-cols-4'>
                    <textarea className='col-span-2 col-start-2'/>
                  </div>
                )}
                <div className="grid grid-cols-4">
                  <label className="col-span-1 flex items-center">
                    Số data muốn chạy
                  </label>
                  <input type="number" value={profile.runDataNumber} onChange={runDataNumberChange} className="col-span-2" />
                </div>
                <div className="grid grid-cols-4">
                  <label className="col-span-1 flex items-center">
                    Bắt đầu từ
                  </label>
                  <input type="number" value={profile.startFrom} onChange={startFromChange} className="col-span-2" />
                </div>
                <div className="grid grid-cols-4">
                  <label className="col-span-1 flex items-center">
                    Số luồng
                  </label>
                  <input type="number" value={profile.thread} onChange={threadChange} className="col-span-2" />
                </div>
                <div className="grid grid-cols-4">
                  <label className="col-span-1 flex items-center">Độ trễ</label>
                  <input type="number" value={profile.delay} onChange={delayChange} className="col-span-2" />
                </div>
                <div className="grid grid-cols-4">
                  <label className="col-span-1 flex items-center">
                    Website đích
                  </label>
                  <input type="text" value={profile.website} onChange={websiteChange} className="col-span-2" />
                </div>
                <div className="grid grid-cols-4">
                  <label className="col-span-1 flex items-center">
                    Import proxy
                  </label>
                  <select defaultValue="manual" value={profile.import} onChange={importChange} className="col-span-2">
                    <option value="manual">Nhập tay</option>
                    <option value="excel">excel</option>
                    <option value="googleSheet">google sheet</option>
                    <option value="txt">txt</option>
                  </select>

                </div>
                <div className="grid grid-cols-4">
                  <label className="col-span-1 flex items-center">
                    Output Profile Folder
                  </label>
                  <input type="text" value={profile.output} onChange={outputChange} className="col-span-2" />
                </div>
                <div>
                  <button className="h-10 px-5 m-2 text-white transition-colors duration-150 bg-green-400 rounded-lg focus:shadow-outline hover:bg-green-600">
                    Fill
                  </button>
                  <button className="h-10 px-5 m-2 text-white transition-colors duration-150 bg-yellow-400 rounded-lg focus:shadow-outline hover:bg-yellow-600">
                    Tạm dừng
                  </button>
                  <button className="h-10 px-5 m-2 text-white transition-colors duration-150 bg-red-400 rounded-lg focus:shadow-outline hover:bg-red-600">
                    Kết thúc
                  </button>
                </div>
              </form>
              <div></div>
            </div> */}
            <div className="border border-gray-300 rounded-lg mt-5 p-10 pb-2 mb-5">
              <div className="ag-theme-alpine h-96" style={{ width: '100%' }}>
                <AgGridReact
                  ref={gridRef}
                  rowData={rowData}
                  columnDefs={columnDefs}
                  defaultColDef={{
                    flex: 1,
                    resizable: true,
                  }}
                  immutableData={false}
                  rowSelection="multiple"
                  rowMultiSelectWithClick
                  enableRangeSelection
                  allowContextMenuWithControlKey
                  getContextMenuItems={getContextMenuItems}
                  onRangeSelectionChanged={rangeChanged}
                  onSelectionChanged={selectionChange}
                  processDataFromClipboard={processDataFromClipboard}
                />
              </div>
              {window.electronAPI.browser.get('browser')}
              <div className="flex justify-end">
                <button
                  type="button"
                  className="h-10 px-5 m-2 text-white transition-colors duration-150 bg-red-400 rounded-lg focus:shadow-outline hover:bg-red-600"
                >
                  Xóa
                </button>
                <button
                  type="button"
                  onClick={() => saveProfileData(rowData || [])}
                  className="h-10 px-5 m-2 text-white transition-colors duration-150 bg-purple-400 rounded-lg focus:shadow-outline hover:bg-purple-600"
                >
                  Update
                </button>

                <button
                  type="button"
                  className="h-10 px-5 m-2 text-white transition-colors duration-150 bg-green-500 rounded-lg focus:shadow-outline hover:bg-green-700"
                >
                  Chạy chrome
                </button>
              </div>
            </div>
            <Transition appear show={isOpen} as={Fragment}>
              <Dialog
                as="div"
                className="fixed inset-0 z-10 overflow-y-auto"
                onClose={closeModal}
              >
                <div className="min-h-screen px-4 text-center">
                  <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                  >
                    <Dialog.Overlay className="fixed inset-0" />
                  </Transition.Child>

                  {/* This element is to trick the browser into centering the modal contents. */}
                  <span
                    className="inline-block h-screen align-middle"
                    aria-hidden="true"
                  >
                    &#8203;
                  </span>
                  <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0 scale-95"
                    enterTo="opacity-100 scale-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100 scale-100"
                    leaveTo="opacity-0 scale-95"
                  >
                    <div className="inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
                      <Dialog.Title
                        as="h3"
                        className="text-lg font-medium leading-6 text-gray-900"
                      >
                        Form UA Input
                      </Dialog.Title>
                      <div className="mt-2">
                        <p className="text-sm text-gray-500">
                          <textarea className="w-full h-96" />
                        </p>
                      </div>

                      <div className="mt-4">
                        <button
                          type="button"
                          className="inline-flex justify-center px-4 py-2 text-sm font-medium text-blue-900 bg-blue-100 border border-transparent rounded-md hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
                          onClick={closeModal}
                        >
                          Submit
                        </button>
                      </div>
                    </div>
                  </Transition.Child>
                </div>
              </Dialog>
            </Transition>
          </Tab.Panel>
          <Tab.Panel>Content {index}</Tab.Panel>
          <Tab.Panel>Content {index}</Tab.Panel>
          <Tab.Panel>Content {index}</Tab.Panel>
          <Tab.Panel>Content {index}</Tab.Panel>
          <Tab.Panel>Content {index}</Tab.Panel>
        </Tab.Panels>
      </Tab.Group>
    </div>
  );
}

export default App;
