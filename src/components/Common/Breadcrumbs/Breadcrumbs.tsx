import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";

interface BreadcrumbItem {
  label?: string;
  path?: string;
  translationKey?: string;
}

interface BreadcrumbsProps {
  className?: string;
}

// Configuration for breadcrumb paths
const breadcrumbConfig: Record<string, BreadcrumbItem[]> = {
  "/dashboard": [{ translationKey: "dashboard.title", path: "/dashboard" }],
  "/dnd": [
    { translationKey: "dashboard.title", path: "/dashboard" },
    { translationKey: "dnd.title" },
  ],
  "/contacts": [
    { translationKey: "dashboard.title", path: "/dashboard" },
    { translationKey: "contacts.title" },
  ],
  "/contacts/:id": [
    { translationKey: "dashboard.title", path: "/dashboard" },
    { translationKey: "contacts.title", path: "/contacts" },
    { translationKey: "contacts.details" },
  ],
  "/projects": [
    { translationKey: "dashboard.title", path: "/dashboard" },
    { translationKey: "projects.title" },
  ],
  "/projects/:id": [
    { translationKey: "dashboard.title", path: "/dashboard" },
    { translationKey: "projects.title", path: "/projects" },
    { translationKey: "projects.project_details" },
  ],
  "/projects/templates": [
    { translationKey: "dashboard.title", path: "/dashboard" },
    { translationKey: "project_templates.title" },
  ],
  "/project-templates/:id": [
    { translationKey: "dashboard.title", path: "/dashboard" },
    { translationKey: "project_templates.title", path: "/project-templates" },
    { translationKey: "project_templates.details" },
  ],
  "/documents": [
    { translationKey: "dashboard.title", path: "/dashboard" },
    { translationKey: "documents.title" },
  ],
  "/documents/:id": [
    { translationKey: "dashboard.title", path: "/dashboard" },
    { translationKey: "documents.title", path: "/documents" },
    { translationKey: "documents.details" },
  ],
  "/documents/:id/edit": [
    { translationKey: "dashboard.title", path: "/dashboard" },
    { translationKey: "documents.title", path: "/documents" },
    { translationKey: "documents.edit_document" },
  ],
  "/documents/templates": [
    { translationKey: "dashboard.title", path: "/dashboard" },
    { translationKey: "document_templates.title" },
  ],
  "/documents/templates/:id": [
    { translationKey: "dashboard.title", path: "/dashboard" },
    { translationKey: "document_templates.title", path: "/document-templates" },
    { translationKey: "document_templates.details" },
  ],
  "/profile": [
    { translationKey: "dashboard.title", path: "/dashboard" },
    { translationKey: "profile.title" },
  ],
  "/component-library": [
    { translationKey: "dashboard.title", path: "/dashboard" },
    { translationKey: "component_library.title" },
  ],
};

const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ className = "" }) => {
  const location = useLocation();
  const { t } = useTranslation();

  // Get breadcrumb items for current path
  const getBreadcrumbItems = (): BreadcrumbItem[] => {
    const currentPath = location.pathname;

    // Check for exact match first
    if (breadcrumbConfig[currentPath]) {
      return breadcrumbConfig[currentPath];
    }

    // Check for dynamic routes (e.g., /contacts/:id, /documents/:id/edit)
    for (const configPath in breadcrumbConfig) {
      if (configPath.includes(":")) {
        // Convert the config path to a regex pattern
        const regexPattern = configPath.replace(/:[^/]+/g, "[^/]+");
        const regex = new RegExp(`^${regexPattern}$`);

        if (regex.test(currentPath)) {
          return breadcrumbConfig[configPath];
        }
      }
    }

    // Fallback: try to build breadcrumbs based on path segments
    const pathSegments = currentPath.split("/").filter(Boolean);
    if (pathSegments.length > 0) {
      const baseRoute = `/${pathSegments[0]}`;
      if (breadcrumbConfig[baseRoute]) {
        return [
          ...breadcrumbConfig[baseRoute],
          { translationKey: "breadcrumbs.details" },
        ];
      }
    }

    // Default fallback - just dashboard
    return [{ translationKey: "dashboard.title", path: "/dashboard" }];
  };

  const breadcrumbItems = getBreadcrumbItems();

  // Don't render if no items
  if (breadcrumbItems.length === 0) {
    return null;
  }

  return (
    <nav
      className={`flex items-center space-x-2 text-sm text-gray-600 ${className}`}
      aria-label="Breadcrumb"
    >
      {breadcrumbItems.map((item, index) => {
        const isLast = index === breadcrumbItems.length - 1;
        const label = item.translationKey
          ? t(item.translationKey)
          : item.label || "";

        return (
          <React.Fragment key={index}>
            {item.path && !isLast ? (
              <Link
                to={item.path}
                className="hover:text-blue-600 transition-colors duration-200"
              >
                {label}
              </Link>
            ) : (
              <span className={isLast ? "text-gray-900 font-medium" : ""}>
                {label}
              </span>
            )}
            {!isLast && (
              <span className="text-gray-400" aria-hidden="true">
                /
              </span>
            )}
          </React.Fragment>
        );
      })}
    </nav>
  );
};

export default Breadcrumbs;
