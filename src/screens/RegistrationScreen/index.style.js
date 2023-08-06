const styles = {
  inputContainer: (theme) => ({
    flexDirection: "row",
    borderBottomColor: "#ccc",
    borderBottomWidth: 1,
    paddingBottom: 8,
    marginBottom: 25,
  }),
  input: (theme) => ({
    borderColor: "#ddd",
    borderWidth: 2,
    borderRadius: 10,
    paddingHorizontal: 30,
    paddingVertical: 10,
  }),
  imageSvg: (theme) => ({
    borderColor: "#ddd",
    borderWidth: 2,
    borderRadius: 10,
    paddingHorizontal: 30,
    paddingVertical: 10,
  }),
  mainContainer: (theme) => ({
    flex: 1,
    fontSize: 28,
    fontWeight: "500",
    color: theme.colors.primaryDark,
    marginBottom: 80,
    top: 60,
    justifyContent: "center",
    alignSelf: "center",
    fontWeight: "bold",
  }),
  socialContainer: (theme) => ({
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 30,
  }),
  birthDate: (theme) => ({
    flexDirection: "row",
    borderBottomColor: "#ccc",
    borderBottomWidth: 1,
    paddingBottom: 8,
    marginBottom: 30,
  }),

  error: (theme) => ({ color: "red", marginTop: 4, marginLeft: 16 }),
};

export default styles;
