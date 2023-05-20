import React,{useState} from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Input from '@mui/material/Input';

import ProductService from '../services/product_service';
import { encodeImage } from '../services/utils';
import { Navigate, useNavigate } from 'react-router-dom';

export default function Post() {
    const theme = createTheme();
    const navigate = useNavigate();

    const [file, setFile] = useState({});
    const [title, setTitle] = useState('')
    const [price, setPrice] = useState(0)
    const [category, setCategory] = useState('')
    const [description, setDescription] = useState('')

    const handleChangeFile = (e)=>{
        setFile(e.target.files[0])
    } 
    const handleChangeTitle = (e)=>{
        setTitle(e.target.value)
    } 
    const handleChangePrice = (e)=>{
        setPrice(e.target.value)
    } 
    const handleChangeCategory = (e)=>{
        setCategory(e.target.value)
    } 
    const handleChangeDescription = (e)=>{
        setDescription(e.target.value)
    } 



    const handleClick = () => {    
        const uploadImage = async () => {
          const data = new FormData();
          data.append('file', file);
          data.append('filename', file.name);
          data.append('title',title);
          data.append('category',category);
          data.append('price',price);
          data.append('description',description);

          // POST request
          ProductService.upload( data, title, category, price,description).then(result=>{
            console.log('result',result);
            if(result.status==200){
                alert("Product Post Successfully!")
                navigate('/myproduct')
            }
         })
            .catch((error) => {
                console.log(error.response);
              });
        }
        uploadImage();       
    }



    return (
        <ThemeProvider theme={theme}>
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <Box
            sx={{
                marginTop: 8,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
            }}
            >
            <Typography component="h1" variant="h5">
                Post New Product
            </Typography>
            <Box  noValidate sx={{ mt: 0 }}>
              <Grid container spacing={1}>
                <Grid item xs={12}>
                    <TextField 
                    margin="normal"
                    required
                    fullWidth
                    id="title"
                    label="Title"
                    name="title"
                    autoFocus
                    onChange={handleChangeTitle}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                    margin="normal"
                    required
                    fullWidth
                    name="category"
                    label="Category"
                    id="category"
                    onChange={handleChangeCategory}
                    />
                </Grid>

                <Grid item xs={12} sm={6}>
                    <TextField
                    margin="normal"
                    required
                    fullWidth
                    name="price"
                    label="Price"
                    id="price"
                    type='Number'
                    onChange={handleChangePrice}
                    />
                </Grid>

                <Grid item xs={12}>   
                    <TextField 
                    multiline={true}
                    rows={4}
                    margin="normal"
                    required
                    fullWidth
                    name="description"
                    label="Description"
                    id="description"
                    onChange={handleChangeDescription}
                    />
                    
                </Grid>

                <Grid item xs={6}>   
                    <Button
                    variant="contained"
                    component="label"
                    
                    style={{backgroundColor:'#CAE5BC'}}

                    >
                    Upload Image
                    <Input type="file" hidden onChange={handleChangeFile}/>
                    </Button>
                </Grid>

                {file.name&&<Grid item xs={6}>   
                    <Typography component="p" variant="h6">
                        {file.name}
                    </Typography>
                </Grid>}

                <Grid item xs={12}>
                    <Button
                    type="button"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                    style={{backgroundColor:'#CAE5BC'}}
                    onClick={handleClick}
                    disabled={!(file.name&&title&&price&&description)}
                    >
                    Post
                    </Button>
                </Grid>        

                </Grid>
            </Box>
            </Box>
        </Container>
        </ThemeProvider>
    );
    }