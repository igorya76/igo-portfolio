import React, { useContext, useEffect, useMemo } from "react";
import {
  Alert,
  AlertTitle,
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Dialog,
  Divider,
  MenuItem,
  TextField,
  Typography,
  useTheme,
  useMediaQuery,
  IconButton,
} from "@mui/material";
import { Internal_Calculator, useCalculatorHook } from "./context";
import { constructionUnitOfMeasures } from "./calculations";
import { useBoolean } from "../../../hooks";
import { NumberInput } from "./numberInput";
import { Close, Info } from "@mui/icons-material";
export function NewEntryCard() {
  const context = useCalculatorHook();
  const isModal = context.isMobile && context.activeMethod.value;
  return (
    <CardWrapperDisplayDialogMobile>
      <Card
        sx={{
          maxWidth: "800px",
          "@media (min-width: 1200px)": {
            maxWidth: "360px",
          },
          minWidth: "340px",
          padding: "10px",
        }}
        variant="outlined"
      >
        <CardHeader
          subheader="Add Item"
          action={
            isModal && (
              <>
                <IconButton
                  onClick={() => {
                    context.activeMethod.reset();
                    context.record.reset();
                  }}
                >
                  <Close />
                </IconButton>
              </>
            )
          }
        />
        <Divider />
        <CardContent>
          <CalculationMethodSelector />
          <PageMethodHeader />
          <PageForm />
        </CardContent>
      </Card>
    </CardWrapperDisplayDialogMobile>
  );
}

function CardWrapperDisplayDialogMobile(p: { children: React.ReactNode }) {
  const context = useCalculatorHook();
  return useMemo(() => {
    if (context.isMobile && context.activeMethod.value) {
      return (
        <Dialog fullScreen open={true}>
          {p.children}
        </Dialog>
      );
    } else {
      return <>{p.children}</>;
    }
  }, [context.activeMethod]);
}

function CalculationMethodSelector() {
  const context = useCalculatorHook();
  const isActive = Boolean(context.activeMethod.value);
  return (
    <>
      {!isActive && (
        <Typography variant="body2">
          Select a Calculation Method (ea, sf, lf, bf) of material you are
          adding
        </Typography>
      )}
      <TextField
        fullWidth
        label="Calculation Method"
        select
        value={context.activeMethod.value || ""}
        disabled={isActive}
        onChange={(e) => {
          context.setCalcMethod(e.target.value);
        }}
      >
        {constructionUnitOfMeasures.map((c, k) => (
          <MenuItem value={c.abbrev} key={k}>
            {c.abbrev} ({c.name})
          </MenuItem>
        ))}
      </TextField>
    </>
  );
}
function PageMethodHeader() {
  const context = useCalculatorHook();
  const calcDef = context.getCalcDef;
  if (!calcDef) return <></>;
  return (
    <Alert color="info" icon={<></>}>
      {/* <AlertTitle>
        {calcDef.name} ({calcDef.abbrev})
      </AlertTitle> */}
      <Typography variant="subtitle2">
        <b>Description:</b> {calcDef.description}
      </Typography>
      <Typography variant="subtitle2">
        <b>Uses:</b> {calcDef.typical_uses}
      </Typography>
    </Alert>
  );
}
function PageForm() {
  const context = useCalculatorHook();
  const calcDef = context.getCalcDef;
  const rec = context.record.value;
  if (!calcDef) return <></>;

  if (!context.isFormVisible.value) {
    return <div></div>;
  }
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: "9px",
        paddingTop: "6px",
      }}
    >
      <TextField
        label="Description"
        fullWidth
        onChange={(e) => {
          context.record.update({ description: e.target.value });
        }}
      />
      {calcDef.fieldsReq.thickness && (
        <MeasureAndUnitInputs
          name="thickness"
          defaultUom="in"
          valNum={rec?.thickness}
          valUnit={rec?.thickness_unit}
        />
      )}
      {calcDef.fieldsReq.width && (
        <MeasureAndUnitInputs
          name="width"
          defaultUom="in"
          valNum={rec?.width}
          valUnit={rec?.width_unit}
        />
      )}
      {calcDef.fieldsReq.length && (
        <MeasureAndUnitInputs
          name="length"
          defaultUom="ft"
          valNum={rec?.length}
          valUnit={rec?.length_unit}
        />
      )}
      <CountAndQuantity />
      <ReadOnlyTotal />
      <Button
        variant="outlined"
        onClick={() => {
          context.addToEstimate();
        }}
      >
        Add
      </Button>
    </Box>
  );
}

function MeasureAndUnitInputs(p: {
  name: string;
  defaultUom: "in" | "ft";
  valNum: number | undefined;
  valUnit: "in" | "ft" | undefined;
}) {
  const hook = useCalculatorHook();
  const nameVal = p.name;
  const nameUnit = `${p.name}_unit`;
  return (
    <Box sx={{ display: "flex", width: "100%" }}>
      <NumberInput
        name={nameVal}
        label={toCapitalCase(p.name)}
        required
        value={p.valNum}
        type="number"
        onChange={(e) => {
          hook.record.update({ [`${nameVal}`]: e.target.value });
        }}
        fullWidth={true}
      />
      <TextField
        sx={{ width: "85px" }}
        name={`${nameUnit}`}
        label={"Unit"}
        select
        value={p.valUnit || p.defaultUom}
        onChange={(e) => {
          hook.record.update({ [`${nameUnit}`]: e.target.value });
        }}
      >
        <MenuItem value={"ft"}>ft</MenuItem>
        <MenuItem value={"in"}>in</MenuItem>
      </TextField>
    </Box>
  );
}

function CountAndQuantity() {
  const context = useCalculatorHook();
  const calcDef = context.getCalcDef;
  const rec = context.record.value;
  return (
    <Box
      sx={{
        display: "flex",
        width: "100%",
      }}
    >
      <NumberInput
        type="number"
        name="count"
        label="Count"
        value={rec?.quantity}
        onChange={(e) => {
          context.record.update({ quantity: Number(e.target.value) });
        }}
        decimalScale={2}
      />
      <NumberInput
        type="number"
        name="cost"
        label="Cost $"
        value={rec?.cost}
        onChange={(e) => {
          context.record.update({ cost: Number(e.target.value) });
        }}
        decimalScale={4}
      />
    </Box>
  );
}

function toCapitalCase(val: string) {
  let all = val.toLowerCase();
  let start = all[0].toUpperCase();
  let balance = all.slice(1);
  return `${start}${balance}`;
}

function ReadOnlyTotal() {
  const hide = useBoolean(false);
  const hook = useCalculatorHook();
  const calcDef = hook.getCalcDef;
  useEffect(() => {
    hide.setTrue();
    setTimeout(() => {
      hide.setFalse();
    }, 2);
  }, [hook.calculated]);
  if (hide.isTrue()) return <></>;
  return (
    <Box sx={{ display: "flex", width: "100%" }}>
      <NumberInput
        name={`total_${calcDef?.abbrev}`.toLowerCase()}
        label={`Total ${calcDef?.abbrev}`}
        value={hook.calculated?.measure}
        readonly={true}
        variant="filled"
        decimalScale={2}
      />
      <NumberInput
        name={`total_cost`}
        label={`Total Cost`}
        variant="filled"
        value={hook.calculated?.cost}
        readonly={true}
        isCurrency={true}
        decimalScale={2}
      />
    </Box>
  );
}
