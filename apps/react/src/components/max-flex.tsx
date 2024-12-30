import React from "react";
import styled from "@emotion/styled";
interface tFlexBoxAutoHeight {
  header?: React.ReactNode | React.FC;
  body?: React.ReactNode | React.FC;
  footer?: React.ReactNode | React.FC;
  showBorder?: boolean;
  name?: string;
}

export function FlexBoxAutoHeight(props: tFlexBoxAutoHeight) {
  let border = props.showBorder ? "2px dashed pink" : "";
  return (
    <Wrapper id={`comp-flexBoxAutoHeight-${props.name}`} border={border}>
      {/* <div style={{ border }}> */}
      <InnerWrapper>
        <RowHeader>
          <GetComponent field={props.header} />
        </RowHeader>
        <RowBody>
          <GetComponent field={props.body} />
        </RowBody>
        <RowFooter>
          <GetComponent field={props.footer} />
        </RowFooter>
      </InnerWrapper>
      {/* </div> */}
    </Wrapper>
  );
}

function GetComponent(p: {
  field: React.ReactNode | React.FC | undefined;
}): any {
  const { field } = p;
  if (!field) {
    return <></>;
  }
  if (typeof field === "function") {
    //*Functional Component
    let Component = field;
    return <Component />;
  }

  //*React Node Provided
  if (typeof field === "object") {
    return <>{field}</>;
  }
}

const Wrapper = styled.div<{ border: string }>`
  display: block;
  flex: 1 1 auto;
  display: flex;
  flex-direction: row;
  height: 100%;
  width: 100%;
  border: ${(props: any) => props.border};
`;
const url = window.location.href;
const InnerWrapper = styled.div`
  flex: 1 1 0;
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const RowHeader = styled.div`
  flex: 0 1 auto;
`;

const RowBody = styled.div`
  overflow: auto;
  height: 100%;
`;

const RowFooter = styled.div`
  flex: 1 1;
`;
