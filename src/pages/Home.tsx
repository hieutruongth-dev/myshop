import {
  AppBar,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Container,
  CssBaseline,
  Grid,
  Link,
  makeStyles,
  Toolbar,
  Typography,
} from "@material-ui/core";
import axios from "axios";
import React from "react";
import { useEffect, useState } from "react";
import { product } from "../model/ProductModel";

const useStyles = makeStyles((theme) => ({
  icon: {
    marginRight: theme.spacing(2),
  },
  heroContent: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(8, 0, 6),
  },
  heroButtons: {
    marginTop: theme.spacing(4),
  },
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  },
  card: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
  },
  cardMedia: {
    paddingTop: "56.25%", // 16:9
  },
  cardContent: {
    flexGrow: 1,
  },
}));

export default function Home() {
  const classes = useStyles();
  const [listProduct, setList] = useState<product[]>([]);
  useEffect(() => {
    axios.get("http://localhost:1107/listfull").then((data) => {
      setList(data.data);
      console.log(data.data);
    });
  }, []);
  return (
    <div>
      <React.Fragment>
        <CssBaseline />
        <AppBar position="relative">
          <Toolbar>
            <Button color="inherit" href="/Admin"> Admin</Button>
          </Toolbar>
        </AppBar>

        <main>
          {/* Hero unit */}
          <Container className={classes.cardGrid} maxWidth="md">
            End hero unit
            <Grid container spacing={4}>
              {listProduct.map((item) => {
                return (
                  <Grid item key={item.id} xs={12} sm={4} md={4}>
                    <Card className={classes.card}>
                      <CardMedia
                        className={classes.cardMedia}
                        image={item.image}
                      /> 
                      <CardContent className={classes.cardContent}>
                        <Typography gutterBottom variant="h5" component="h2">
                          {item.name}
                        </Typography>
                        <Typography>{item.description}</Typography>
                      </CardContent>
                      <CardActions>
                        <Button size="small" color="primary">
                          Add To Cart
                        </Button>
                        <Typography>{item.price}</Typography>
                      </CardActions>
                    </Card>
                  </Grid>
                );
              })}
            </Grid>
          </Container>
        </main>
      </React.Fragment>
    </div>
  );
}
