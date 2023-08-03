const styles = {
  container: (theme) => ({
    marginTop: 72,
    marginLeft: 15,
  }),

  centered: (theme) => ({
    flex: 1,
    justifyContent: "center",
  }),

  title: (theme) => ({
    top: 64,
    bottom: 24,
    paddingTop: 30,
    paddingBottom: 24,
    textAlign: "center",
    fontSize: 30,
    fontWeight: "bold",
    backgroundColor: theme.colors.primaryDark,
    color: theme.colors.white,
  }),
  label: (theme) => ({
    marginLeft: 15,
    color: theme.colors.primaryDark,
  }),

  input: () => ({
    margin: 8,
    height: 48,
    borderWidth: 1,
    padding: 12,
    marginBottom: 24,
  }),
  submitButton: (theme, disabled) => ({
    backgroundColor: !disabled
      ? theme.colors.darkGrey
      : theme.colors.primaryDark,
    marginHorizontal: "30%",
    height: 50,
    width: "35%",
    padding: 12,
    borderWidth: 1,
    borderRadius: 30,
  }),
  submitButtonText: (theme, disabled) => ({
    textAlign: "center",
    color: !disabled ? theme.colors.default : theme.colors.darkGrey,
    fontWeight: "bold",
    fontSize: 18,
  }),
};

export default styles;
