import { useState, useCallback } from "react";
import { Box, CircularProgress, Icon, IconButton, InputAdornment, InputBase, List, ListSubheader, Stack, Typography, debounce } from "@mui/material";
import SearchSuggestion from "./SearchSuggestion";
import Dummies from "../dummies/users.json";
import { $User } from "../services";

function SearchBar({ disabledKeys, onClick }) {
  const [search, setSearch] = useState("");
  const [searched, setSearched] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [loadingSearch, setLoadingSearch] = useState(false);

  const fetchSearch = useCallback(async (value) => {
    if (!value) {
      return;
    }

    setLoadingSearch(true);

    await new Promise((resolve) => setTimeout(resolve, 1000));

    const data = await $User.search({ search: value });

    setLoadingSearch(false);

    setSearched(value);

    if (data.length) {
      setSuggestions(data);
    } else {
      setSuggestions([{ FirstName: "No se encontraron resultados", LastName: "", WWID: -1 }]);
    }
  }, []);

  const debouncedSearch = useCallback(debounce(fetchSearch, 500), []);

  const handleSubmitSearch = async (event) => {
    event.preventDefault();
    await fetchSearch();
  };

  const handleChangeSearch = (value) => {
    setSearch(value);
    debouncedSearch(value);
  };

  return (
    <Box
      component="form"
      position="relative"
      onSubmit={handleSubmitSearch}
      sx={(t) => ({
        "&:focus-within": {
          "& .search-input": {
            ...(suggestions.length && search.length > 0
              ? {
                  backgroundColor: "white",
                  boxShadow: 1,
                  borderColor: "transparent",
                  borderRadius: 1,
                  borderBottomLeftRadius: 0,
                  borderBottomRightRadius: 0,
                }
              : {
                  borderColor: "ActiveBorder",
                }),
          },
          "& .suggestions-box": {
            ...(suggestions.length > 0 && search.length > 0
              ? {
                  opacity: 1,
                  visibility: "visible",
                }
              : {}),
          },
        },
      })}
    >
      <InputBase
        fullWidth
        size="small"
        className="search-input"
        placeholder="Search user"
        value={search}
        inputProps={{
          onChange: ({ target }) => handleChangeSearch(target.value),
        }}
        startAdornment={
          <InputAdornment position="start">
            {loadingSearch ? (
              <Box display="flex" justifyContent="center" alignItems="center" padding={1}>
                <CircularProgress size={18} />
              </Box>
            ) : (
              <IconButton onClick={handleSubmitSearch}>
                <Icon baseClassName="far" className="fa-search" sx={{ fontSize: 16 }} />
              </IconButton>
            )}
          </InputAdornment>
        }
        sx={(t) => ({
          padding: 1,
          borderRadius: 1,
          boxShadow: 1,
          backdropFilter: "saturate(180%) blur(5px)",
          transition: t.transitions.create(["background-color"]),
          "& .MuiInputBase-input": {
            width: "100%",
            padding: 0,
          },
        })}
      />
      <Box
        className="suggestions-box"
        position="absolute"
        zIndex={1}
        display="flex"
        flexDirection="column"
        maxHeight="max(calc(75vh - 64px), 50vh)"
        overflow="auto"
        sx={(t) => ({
          top: "calc(100%)",
          width: "100%",
          borderBottomLeftRadius: 8,
          borderBottomRightRadius: 8,
          boxShadow: 1,
          backgroundColor: "white",
          clipPath: "inset(0px -16px -16px -16px)",
          opacity: 0,
          visibility: "hidden",
          transition: t.transitions.create(["opacity", "visibility"]),
        })}
      >
        {suggestions.length ? (
          <List
            subheader={
              <ListSubheader color="primary">
                Resultados de &quot;
                {searched}
                &quot;
              </ListSubheader>
            }
          >
            {suggestions.map((suggestion, index) => (
              <SearchSuggestion
                key={index}
                disabled={suggestion.WWID === -1}
                primary={
                  <>
                    {suggestion.FirstName} {suggestion.LastName}
                  </>
                }
                secondary={
                  <Stack component="span">
                    <span>{suggestion.EmailAddress}</span>
                    <span>{suggestion.BusinessTelephone}</span>
                  </Stack>
                }
                onClick={() => onClick(suggestion)}
              />
            ))}
          </List>
        ) : (
          <Typography>No se encontraron resultados</Typography>
        )}
      </Box>
    </Box>
  );
}

export default SearchBar;
