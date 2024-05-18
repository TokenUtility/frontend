import { Box, MenuItem, FormControl, Select } from "@mui/material";
import * as React from "react";
import { SelectChangeEvent } from "@mui/material/Select";
import { mapSymbolImageToken, listToken } from "@/configs";
import Image from "next/image";
import ChainIcon from "@/app/components/Common/ChainIcon";
import TypoC from "@/app/components/Common/Typo";

const FilterTokenPool = () => {
  const [pool, setPool] = React.useState("");
  const [token, setSortByToken] = React.useState("");
  const handleChangePool = (event: SelectChangeEvent) => {
    setPool(event.target.value as string);
  };

  const handleChangeSortBy = (event: SelectChangeEvent) => {
    setSortByToken(event.target.value as string);
  };

  return (
    <>
      <Box sx={{ minWidth: 200, borderRadius: "22px", overflow: "hidden" }}>
        <FormControl fullWidth variant="filled">
          <Select
            labelId="pool-select-label"
            id="pool-select"
            value={pool}
            displayEmpty={true}
            onChange={handleChangePool}
          >
            <MenuItem value={""} disabled sx={{ py: 1.5, px: 2 }}>
              All Arena Pools
            </MenuItem>
            <MenuItem value={1} sx={{ py: 1.5, px: 2 }}>
              X2 Arena Pools
            </MenuItem>
            <MenuItem value={2} sx={{ py: 1.5, px: 2 }}>
              X10 Arena Pools
            </MenuItem>
            <MenuItem value={3} sx={{ py: 1.5, px: 2 }}>
              X100 Arena Pools
            </MenuItem>
          </Select>
        </FormControl>
      </Box>
      <Box sx={{ minWidth: 250, borderRadius: "22px", overflow: "hidden" }}>
        <FormControl fullWidth variant="filled">
          <Select
            labelId="token-select-label"
            id="token-select"
            value={token}
            onChange={handleChangeSortBy}
            displayEmpty={true}
            inputProps={{
              sx: { py: 1, display: "flex", alignItems: "center" },
            }}
          >
            <MenuItem value={""} disabled sx={{ py: 1.5, px: 2 }}>
              All Tokens
            </MenuItem>
            {listToken.map((token) => (
              <MenuItem key={token.id} value={token.id} sx={{ py: 1.5, px: 2 }}>
                <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                  <ChainIcon
                    src={token.logo}
                    alt="sui-logo"
                    size={32}
                    disabledResponsive={true}
                  />
                  <TypoC font="bold">{token.name}</TypoC>
                </Box>
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
    </>
  );
};

export default FilterTokenPool;
