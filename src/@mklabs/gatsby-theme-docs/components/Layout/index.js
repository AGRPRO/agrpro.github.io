/* @jsx jsx */
import { useState, useRef, Fragment } from 'react';
import { jsx, css } from '@emotion/react';
import PropTypes from 'prop-types';

import TableOfContents from '@mklabs/gatsby-theme-docs/src/components/Docs/TOC';
import Sidebar from '../Sidebar';
import Header from '../Header';
import Overlay from '@mklabs/gatsby-theme-docs/src/components/Overlay';
import { Container, Main, Children } from './styles';
import { useStaticQuery, graphql, Link } from 'gatsby';
import Img from "gatsby-image";


export default function Layout({
    children,
    disableTableOfContents,
    title,
    headings,
}) {

    const data = useStaticQuery(
        graphql`
            query {
                site {
                    siteMetadata {
                        siteUrl
                    }
                }

                file(relativePath: { eq: "angeliv_logo.jpg" }) {
                    childImageSharp {
                      # Specify the image processing specifications right in the query.
                      # Makes it trivial to update as your page's design changes.
                      fixed(width: 48, height: 48) {
                        ...GatsbyImageSharpFixed
                      }
                    }
                  }
                
            }
        `,
    );

    const { siteUrl } = data.site.siteMetadata;

    console.log(data)

    const contentRef = useRef(null);
    const [isMenuOpen, setMenuOpen] = useState(false);
    const disableTOC =
        disableTableOfContents === true || !headings || headings.length === 0;

    function handleMenuOpen() {
        setMenuOpen(!isMenuOpen);
    }

    return (
        <Fragment>
            <Overlay isMenuOpen={isMenuOpen} onClick={handleMenuOpen} />
            <header className="docs-header">
                <div class="header-links">
                    <Link to={siteUrl} aria-label="Go to home page">
                        <Img fixed={data.file.childImageSharp.fixed} />
                    </Link>
                    
                    <nav>
                        <Link to="/">Documentation</Link>
                        <Link to="/api">API</Link>                        
                    </nav>
                </div>
            </header>
            <Container>
                <Sidebar isMenuOpen={isMenuOpen} />
                <Main>
                    <Header handleMenuOpen={handleMenuOpen} />
                    {title && (
                        <h1
                            css={css`
                                display: none;

                                @media (max-width: 1200px) {
                                    display: block;
                                }
                            `}
                        >
                            {title}
                        </h1>
                    )}
                    <Children ref={contentRef}>
                        {title && (
                            <h1
                                css={css`
                                    @media (max-width: 1200px) {
                                        display: none;
                                    }
                                `}
                            >
                                {title}
                            </h1>
                        )}
                        {children}
                    </Children>
                    <TableOfContents
                        headings={headings}
                        disableTOC={disableTOC}
                        contentRef={contentRef}
                    />
                </Main>
            </Container>
        </Fragment>
    );
}

Layout.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node,
    ]).isRequired,
    disableTableOfContents: PropTypes.bool,
    title: PropTypes.string,
    headings: PropTypes.array,
};

Layout.defaultProps = {
    disableTableOfContents: false,
    title: '',
    headings: null,
};
