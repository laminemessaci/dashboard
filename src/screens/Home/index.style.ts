const styles = {
  container: (theme) => ({
    flex: 1,
    justifyContent: "center",
    marginLeft: 16,
  }),

  centered: (theme) => ({
    flex: 1,
    justifyContent: "center",
    marginTop: 120,
  }),
  description: (theme) => ({
    marginLeft: 24,
    marginTop: 12,
    marginBottom: 12,
  }),

  image: (theme) => ({
    flex:1,
    justifyContent: 'center',
    alignSelf:'center',
    height: 150,
    borderRadius: 20,
    objectFit: "contain",
  }),

  imageContainer: (theme) => ({
    width: "100%",
    marginBottom: 60,
  }),
};

export default styles;
