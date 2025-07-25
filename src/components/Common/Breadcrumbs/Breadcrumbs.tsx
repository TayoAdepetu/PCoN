import React from "react";
import { Link, useLocation } from "react-router-dom";

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
  "/dashboard": [{ translationKey: "dashboard", path: "/dashboard" }],
  "/dnd": [
    { translationKey: "dashboard", path: "/dashboard" },
    { translationKey: "dnd" },
  ],  
  "/projects": [
    { translationKey: "dashboard", path: "/dashboard" },
    { translationKey: "projects" },
  ],
  "/projects/:id": [
    { translationKey: "dashboard", path: "/dashboard" },
    { translationKey: "projects", path: "/projects" },
    { translationKey: "projects details" },
  ],
  "/profile": [
    { translationKey: "dashboard", path: "/dashboard" },
    { translationKey: "profile" },
  ],
};

const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ className = "" }) => {
  const location = useLocation();

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
          ? item.translationKey
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
