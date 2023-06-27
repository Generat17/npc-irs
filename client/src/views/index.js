// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  Container,
  Row,
} from "reactstrap";
// core components
import Header from "../components/Headers/Header.js";
import {useEffect, useState} from "react";
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import loading from '../assets/img/loading.gif';
import {SERVER_URL} from "../variables/urlServer";

const Index = () => {
  const [gridApiUser, setGridApiUser] = useState(null);
  const [gridApiPost, setGridApiPost] = useState(null);

  const [selectedUserId, setSelectedUserId] = useState(0);
  const [selectedPostId, setSelectedPostId] = useState(0);

  // row data Post table
  const [rowDataPost, setRowDataPost] = useState([])

  // input Title value
  const [inputValue, setInputValue] = useState('')

  // update Post data from server and set in table
  const updateDataPost = () => {
    if (gridApiPost !== null){
      getRowDataPost()
      gridApiPost.api.setRowData(rowDataPost)
    }
  }

  // update Post data when the selected user changes
  useEffect(()=>{
    updateDataPost()
  }, [selectedUserId])

  // header user table
  const columnsUser = [
    { headerName: "Id", field: "id", filter: "agTextColumnFilter",cellRenderer:'loading' },
    { headerName: "Name", field: "name", filter: "agTextColumnFilter" },
    { headerName: "Birthday", field: "birthday", filter: "agTextColumnFilter" },
    { headerName: "Coefficient", field: 'coefficient', filter: "agTextColumnFilter" },
    { headerName: "Registration", field: 'createdAt', filter: "agTextColumnFilter" },
  ]

  // header post table
  const columnsPost = [
    { headerName: "Id", field: "id", filter: "agTextColumnFilter",cellRenderer:'loading' },
    { headerName: "Title", field: "title", filter: "agTextColumnFilter" },
    { headerName: "CreatedAt", field: "createdAt", filter: "agTextColumnFilter" },
  ]

  // get data User table from server
  const datasourceUser = {
    getRows(params) {
      // get the number of records in the table
      fetch(SERVER_URL + `user/count`)
          .then(httpResponseCount => httpResponseCount.json())
          .then(responseCount => {
            //get user data from the server using pagination
            //console.log(JSON.stringify(params, null, 1));
            const { startRow, endRow } = params
            let url = SERVER_URL + `user?`
            //Pagination
            url += `start=${startRow}&end=${endRow}`
            fetch(url)
                .then(httpResponse => httpResponse.json())
                .then(response => {
                  params.successCallback(response, Number(responseCount[0].count));
                })
                .catch(error => {
                  console.error(error);
                  params.failCallback();
                })
          }).catch(error => {
            console.error(error);
          })
    }
  };

  // get data Post table from server
  const getRowDataPost = ()=> {
      fetch(SERVER_URL + `post/${selectedUserId}`)
          .then(httpResponse => httpResponse.json())
          .then(response => {
            console.log(response)
            setRowDataPost(response)
          })
          .catch(error => {
            console.error(error);
          })
  };

  // delete the selected post from the server
  const deletePost = () => {
    fetch(SERVER_URL + `post/${selectedPostId}`, {method: "DELETE"})
        .then(httpResponse => httpResponse.json())
        .then(response => {
          setSelectedPostId(0)
          setInputValue('')
          updateDataPost()
        }).catch(error => {
          console.error(error);
        })
  }

  // create post
  const createPost = (title) => {

    const data = {title: `${inputValue}`, userId: `${selectedUserId}`}

    fetch(SERVER_URL + `post`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data)
    })
        .then(httpResponse => httpResponse.json())
        .then(response => {
          setSelectedPostId(0)
          setInputValue('')
          updateDataPost()
        }).catch(error => {
      console.error(error);
    })
  }

  // update post
  const updatePost = (title) => {
    const data = {title: `${inputValue}`, userId: `${selectedUserId}`}
    console.log("Обновим")

    fetch(SERVER_URL + `post/${selectedPostId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data)
    })
        .then(httpResponse => httpResponse.json())
        .then(response => {
          setSelectedPostId(0)
          setInputValue('')
          updateDataPost()
        }).catch(error => {
      console.error(error);
    })
  }

  const selectionUserChangedCallback = e => {
    setInputValue('')
    const selectedRows = gridApiUser.api.getSelectedRows()
    setSelectedUserId(selectedRows[0].id)
  };

  const selectionPostChangedCallback = e => {
    const selectedRows = gridApiPost.api.getSelectedRows()
    setSelectedPostId(selectedRows[0].id)
    setInputValue(selectedRows[0].title)
  };

  const onGridReadyUser = (params) => {
    setGridApiUser(params);
    // register datasource with the grid
    params.api.setDatasource(datasourceUser);
  }

  const componentsUser={
    loading:(params)=>{
      if(params.value!==undefined){
        return params.value
      } else {
        return <img src={loading} alt='loading'/>
      }
    }
  }

  const onGridReadyPost = (params) => {
    setGridApiPost(params);
  }

  const componentsPost={
    loading:(params)=>{
      if(params.value!==undefined){
        return params.value
      } else {
        return <img src={loading} alt='loading'/>
      }
    }
  }

  return (
    <>
      <Header />
      <Container className="mt--7" fluid>
        {/* User table */}
        <Row>
          <div className="col">
            <Card className="shadow">
        <CardHeader className="border-0">
          <h3 className="mb-0">Users table</h3>
            <div className="example-header">
              Selection row id:
              <span id="selectedRows">{selectedUserId == 0 ? "select row" : selectedUserId}</span>
            </div>
        </CardHeader>
        <div>
          <div className="ag-theme-alpine" style={{height:400}}>
            <AgGridReact
                columnDefs={columnsUser}
                rowModelType="infinite"
                onGridReady={onGridReadyUser}
                components={componentsUser}
                rowSelection={'single'}
                onSelectionChanged={selectionUserChangedCallback}
            />
          </div>
        </div>
            </Card>
          </div>
        </Row>
        <br />
        {/* Post table */}
        <Row>
          <div className="col">
            <Card className="shadow">
              <CardHeader className="border-0">
                <h3 className="mb-0">Posts table</h3>
                <div className="example-header">
                  {selectedUserId == 0 ? `Select row from users table` : `User posts with id = ${selectedUserId}`}
                </div>
                <br />
                <div>
                  <Button color="success" type="button" onClick={createPost}>
                  Добавить
                </Button>
                  <Button color="info" type="button" disabled={selectedPostId == 0 ? true : false} onClick={updatePost}>
                    Изменить
                  </Button>
                  <Button color="primary" type="button" disabled={selectedPostId == 0 ? true : false} onClick={deletePost}>
                    Удалить
                  </Button>
                </div>

                <div>
                  <br />
                  Title:
                  <input style={{margin: "0 10px"}} type="text" value={inputValue} onChange={(event) => {setInputValue(event.target.value)}}/>
                </div>

              </CardHeader>
              <div>
                <div className="ag-theme-alpine" style={{height:400}}>
                  <AgGridReact
                      columnDefs={columnsPost}
                      rowModelType="clientSide"
                      rowData={rowDataPost}
                      onGridReady={onGridReadyPost}
                      components={componentsPost}
                      rowSelection={'single'}
                      onSelectionChanged={selectionPostChangedCallback}
                  />
                </div>
              </div>
            </Card>
          </div>
        </Row>
      </Container>
    </>
  );
};

export default Index;
