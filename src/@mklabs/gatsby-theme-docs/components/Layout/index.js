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


export default function Layout({
    children,
    disableTableOfContents,
    title,
    headings,
}) {

    const { site } = useStaticQuery(
        graphql`
            query {
                site {
                    siteMetadata {
                        siteAuthor
                    }
                }
            }
        `,
    );

    const { siteAuthor } = site.siteMetadata;

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
                    <Link to={siteAuthor} aria-label="Go to home page">
                        MK.
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
