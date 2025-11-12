app.use(cors());
app.use(express.json());

app.use("/", routes);

app.use(handleNotFound);
app.use(handleError);
