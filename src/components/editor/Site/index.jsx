import styled from "styled-components";

const Root = styled.div`
  max-width: 600px;
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const SiteTitle = styled.h1`
  font-size: 24px;
  font-weight: 500;
  color:  ${props => props.color}; // Change to Secondary color
  margin-bottom: 12px;
`;

const SiteDescription = styled.p`
  font-size: 16px;
  font-weight: 400;
  color: ${props => props.color}; // Change to Tertiary color
`;

const DocLink = styled.p`
  text-decoration: none;
  font-weight: 500;
  color: ${props => props.color}; // Change to Secondary color
  margin-top: 12px;
`;

/** Site preview for the Editor page */
function Site({ colors }) {

  return (
    <Root>
      <SiteTitle color={colors?.secondary}>Create your own code snippets</SiteTitle>
      <SiteDescription color={colors?.tertiary}>
        Welcome to our generator. You can look around and create your own code snippets. 
        After creating you can save it to jpg file and share with other people on social media, for your documentation or wherever you want!
      </SiteDescription>
      <DocLink
        color={colors?.secondary}
      >
        Have fun!
      </DocLink>
    </Root>
  );
}

export default Site;
