import { Box, Button, Container, FormControl, IconButton, InputAdornment, OutlinedInput, Stack, Typography,styled,Paper } from "@mui/material";
import { useState,useReducer } from "react";
import "./App.css";
import { Add, Delete } from "@mui/icons-material";


const initialState =[];

const TODOS_ACTIONS ={
  ADD_TASK : 'add_task',
  DELETE_TASK : 'delete_task',
  RESET_TASK : 'reset_task'
}

const Item = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(1),
  color: '#000',
  background:'#ebbdffd9',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between', 
}));

function reducer(state, action){
  switch(action.type){
    case TODOS_ACTIONS.ADD_TASK:return[
      ...state,
      {
        id:state.length+1,
        name: action.payload
      }
    ];
      
      case TODOS_ACTIONS.DELETE_TASK : return state.filter(d => d.id !== action.payload);

      case TODOS_ACTIONS.RESET_TASK : return init(action.payload)

    default : return state;
  }  
}

function init(initialState){
  return initialState;
}


const Todos = () => {
  const [taskname, setTaskName] = useState("");
  const[todos, dispatch] = useReducer(reducer, initialState,init);

  return (
    <>
    <Container
      maxWidth="sm"
      sx={{
        background: "#fff",
        height: "100vh",
        mt: { xs: '0rem', md: '3rem' },
        mb: { xs: '0rem', md: '3rem' },
        borderRadius: { xs: '0px', md: '2rem' },
        boxShadow: { md: 'rgba(50, 50, 93, 0.25) 0px 13px 27px -5px, rgba(0, 0, 0, 0.3) 0px 8px 16px -8px' },
        margin: 'auto',
        textAlign: 'center'
      }}
    >    
    <Typography variant="h5" className="header">TODO LIST</Typography>

      <Box display="flex" justifyContent="end" mb="0.5rem">
        <Button className="ResetBtn" variant="text" sx={{'&:hover':{background:"transparent"},}}
        onClick={() => dispatch({type:TODOS_ACTIONS.RESET_TASK, payload:initialState})}>Reset</Button>
      </Box>
      
      <Box>
        <FormControl sx={{ m:0,  width: '100%' }} variant="outlined">
          <OutlinedInput
          value={taskname} onChange={(e) => setTaskName(e.target.value)}
          
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                onClick={() => {
                dispatch({ type: TODOS_ACTIONS.ADD_TASK, payload: taskname });
                setTaskName(""); }}
                  aria-label="toggle password visibility" edge="end" className="AddBtn"
                >
                 <Add sx={{color:"#fff"}}/>
                </IconButton>
              </InputAdornment>
            }
          
          />
        </FormControl>
        </Box>

       <br />
      <Box style={{ maxHeight: "60vh", overflowY: "auto" }}> 
      <Stack direction="column" className="ListBox" >
      {todos.map(todo => 
        (
       <Item  key={todo.id} sx={{width:"95%", height:"40px",borderRadius:"0",
         fontSize:"0.9rem", color:"#222222", textAlign:"start"
       }}>
        {todo.name}
        <Box mb="0">
          <IconButton onClick={() => dispatch({type:TODOS_ACTIONS.DELETE_TASK, payload:todo.id})}
         >
            <Delete sx={{color:"#6d049d", fontSize:"1.3rem"}} />
        </IconButton >
        </Box>
      </Item>
   
    ))}
    </Stack>
    </Box>

    </Container>
    </>
  );
}

export default Todos;
