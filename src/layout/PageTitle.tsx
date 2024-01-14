import React from "react";

interface PageTitleProps {
    pageTitle: string;
    description?: string;
    name?: string;
    type?: string;
    canonical?: string;
}

const PageTitle: React.FC<PageTitleProps> = ({
    pageTitle,
    description,
    name,
    type,
    canonical,
}) => {
    return (
        <div>
            {/* Standard metadata tags */}
            <title>{pageTitle}</title>
            {description && <meta name="description" content={description} />}
            {canonical && canonical.length > 0 && (
                <link rel="canonical" href={canonical} />
            )}
        </div>
    );
};
export default PageTitle;
