import React,{useEffect} from 'react';
import {useSelector,useDispatch} from 'react-redux'
import {fetchRequest,fetchSuccess,fetchFailure} from './Redux'
import axios from 'axios';
import './App.css';
import { makeStyles,withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

function App() {
  const loading=useSelector(state=>state.loading);
  const data=useSelector(state=>state.users);
  const error=useSelector(state=>state.error);
  const dispatch=useDispatch();
  
  const fetchData= async ()=>{
    try{
      dispatch(fetchRequest());
      const response=await axios.get("https://jsonplaceholder.typicode.com/users");
      dispatch(fetchSuccess(response.data))
    }catch(err){
      dispatch(fetchFailure("Something went wrong please try again"))
    }
  }

  useEffect(() => {
    fetchData();
  },[]);

  const StyledTableCell = withStyles((theme) => ({
    head: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    body: {
      fontSize: 14,
    },
  }))(TableCell);

  const StyledTableRow = withStyles((theme) => ({
    root: {
      '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
      },
    },
  }))(TableRow);

  const useStyles = makeStyles({
    container:{
      marginTop:20,
      width:"50%",
      margin:"auto",
      ['@media (max-width:768px)']:{
        width:"100%",
      }
    },
    table: {
      minWidth: 650,
    },
    heading:{
      fontWeight:"bold",
      fontSize:18,
    }
  });


  const classes = useStyles();

  return (
    <div>
      {loading?
        <div>Loading...</div>:
        error?
          <div>{error}</div>:
          <TableContainer className={classes.container} component={Paper}>
            <Table className={classes.table} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <StyledTableCell className={classes.heading}>Name</StyledTableCell>
                  <StyledTableCell className={classes.heading} align="right">Email</StyledTableCell>
                  <StyledTableCell className={classes.heading} align="right">Phone&nbsp;No.</StyledTableCell>
                  <StyledTableCell className={classes.heading} align="right">Website</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {data.map((userData) => (
                  <StyledTableRow key={userData.id}>
                    <StyledTableCell component="th" scope="row">
                      {userData.name}
                    </StyledTableCell>
                    <StyledTableCell align="right">{userData.email}</StyledTableCell>
                    <StyledTableCell align="right">{userData.phone}</StyledTableCell>
                    <StyledTableCell align="right">{userData.website}</StyledTableCell>
                  </StyledTableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
      }
    </div>
  );
}

export default App;
