const styles = {
  contentContainer: (theme) => ({
    flex: 1,
    backgroundColor: theme.colors.primary,
  }),
  container: (theme) => ({
    padding: 40,
    alignItems: "center",
  }),

  inputStyle: (theme) => ({
    fontSize: 15,
    color: theme.colors.white,
  }),
  inputContainerStyle: (theme) => ({
    borderBottomWidth: 3,
    borderBottomColor: theme.colors.lightGray,
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
    width: "90%",
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
