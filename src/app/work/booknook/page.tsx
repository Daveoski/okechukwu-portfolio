import type { Metadata } from "next";
import { getProject, projects } from "@/lib/data";
import { Reveal } from "@/components/motion/reveal";
import { ApiExplorer } from "@/components/work/api-explorer";
import { ArchFrame, ArchLink, ArchNode } from "@/components/work/architecture";
import {
  CaseCover,
  CaseHero,
  CaseSection,
  FeatureGrid,
  NextProject,
  Prose,
  StackList,
} from "@/components/work/case-study";

export const metadata: Metadata = {
  title: "BookNook — case study",
  description:
    "BookNook is a reading-tracker REST API on Microsoft Azure: Express on App Service, Azure SQL, Key Vault through managed identity, Blob Storage and GitHub Actions deployment.",
  alternates: { canonical: "/work/booknook" },
};

const schema = [
  ["Id", "INT", "Primary key, IDENTITY(1,1)"],
  ["Title", "NVARCHAR(200)", "Required"],
  ["Author", "NVARCHAR(100)", "Required"],
  ["Genre", "NVARCHAR(50)", "Default 'Fiction'"],
  ["Status", "NVARCHAR(20)", "Default 'To Read'"],
  ["Rating", "INT", "Nullable"],
  ["Notes", "NVARCHAR(MAX)", "Default ''"],
  ["CoverUrl", "NVARCHAR(500)", "Blob URL"],
  ["AddedAt", "DATETIME2", "Default GETUTCDATE()"],
];

const lessons = [
  {
    title: "No secrets in config",
    body: "DefaultAzureCredential gives the app a managed identity, so it reads the SQL connection string from Key Vault at start-up instead of keeping it in environment files.",
    tag: "Security",
  },
  {
    title: "Parameterised queries everywhere",
    body: "Every value reaches SQL Server through typed mssql inputs — never string concatenation — which shuts the door on SQL injection.",
    tag: "Security",
  },
  {
    title: "Honest health checks",
    body: "/api/health actually queries the database and returns 503 when it can't, so the platform and humans see real status, not a hopeful 200.",
    tag: "Reliability",
  },
  {
    title: "Predictable blob names",
    body: "Covers are stored as book-{id}.{ext}, so re-uploading replaces the old image and the record keeps a stable public URL.",
    tag: "Storage",
  },
  {
    title: "Fail fast on start-up",
    body: "If Key Vault, SQL or Blob Storage can't be reached, the server logs the error and exits instead of serving half-working requests.",
    tag: "Reliability",
  },
  {
    title: "Push to deploy",
    body: "A GitHub Actions workflow installs dependencies on Node 22 and deploys to Azure Web App on every push to main.",
    tag: "CI/CD",
  },
];

export default function BookNookPage() {
  const { project, next } = getProject("booknook");

  return (
    <>
      <CaseHero project={project} total={projects.length} />
      <CaseCover project={project} />

      <CaseSection index="01" label="Overview" title="A reading tracker, *built for the cloud.*">
        <Prose>
          <p>
            BookNook is the API behind a personal reading list: add books, track their status, rate
            them, keep notes and upload covers. I built it as my cloud computing capstone, with one goal
            beyond the features — <strong>use the platform properly</strong>: managed identity instead of
            passwords, managed services instead of servers, and automated deployment instead of manual
            uploads.
          </p>
        </Prose>
      </CaseSection>

      <CaseSection index="02" label="Architecture" title="Managed services, *zero stored secrets.*">
        <ArchFrame
          title="Fig. 1 — BookNook on Microsoft Azure"
          footer={
            <p className="text-[13px] text-bone-dim">
              <span className="type-label mr-2 text-gfp">CD</span>
              GitHub Actions → azure/webapps-deploy on every push to main (Node 22)
            </p>
          }
        >
          <div className="grid items-stretch md:grid-cols-[1fr_auto_1.3fr_auto_1fr]">
            <ArchNode kicker="Client" title="Any HTTP client" detail="curl, Postman or a web app — JSON over HTTPS" />
            <ArchLink label="REST" className="md:w-20" />
            <ArchNode tone="cyan" kicker="Azure App Service" title="Express 5 API" detail="Node.js · Multer · DefaultAzureCredential" />
            <ArchLink label="mssql" className="md:w-20" />
            <ArchNode tone="dapi" kicker="Azure SQL" title="Books table" detail="Parameterised queries · OUTPUT INSERTED.*" />
          </div>
          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            <ArchNode tone="amber" kicker="Azure Key Vault" title="sql-connection-string" detail="Read at start-up through managed identity" />
            <ArchNode tone="gfp" kicker="Azure Blob Storage" title="covers container" detail="Public-read blobs, one per book" />
          </div>
        </ArchFrame>
      </CaseSection>

      <CaseSection index="03" label="API" title="Seven endpoints, *one clear contract.*">
        <Prose>
          <p>
            A small REST surface with honest status codes: 201 on create, 204 on delete, 400 when
            required fields are missing, 404 when a book doesn&rsquo;t exist and 503 when the database is
            down. Pick an endpoint to see its contract.
          </p>
        </Prose>
        <Reveal className="mt-10">
          <ApiExplorer />
        </Reveal>
      </CaseSection>

      <CaseSection index="04" label="Data model" title="One table, *well defined.*">
        <Reveal>
          <div className="overflow-hidden rounded-3xl border border-line">
            <table className="w-full text-left text-[14px]">
              <caption className="sr-only">Books table schema</caption>
              <thead className="bg-ink-850">
                <tr className="type-label text-mute">
                  <th scope="col" className="px-5 py-3.5 font-normal">Column</th>
                  <th scope="col" className="px-5 py-3.5 font-normal">Type</th>
                  <th scope="col" className="hidden px-5 py-3.5 font-normal sm:table-cell">Notes</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-line">
                {schema.map(([column, type, note]) => (
                  <tr key={column} className="transition-colors hover:bg-ink-850">
                    <td className="px-5 py-3 font-mono text-[13px] text-dapi">{column}</td>
                    <td className="px-5 py-3 font-mono text-[13px] text-bone-dim">{type}</td>
                    <td className="hidden px-5 py-3 text-mute sm:table-cell">{note}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Reveal>
      </CaseSection>

      <CaseSection index="05" label="Decisions" title="Small choices, *production habits.*">
        <FeatureGrid items={lessons} />
      </CaseSection>

      <CaseSection index="06" label="Stack">
        <StackList
          groups={[
            { label: "Runtime", items: ["Node.js 22", "Express 5", "Multer", "dotenv"] },
            { label: "Azure", items: ["App Service", "Azure SQL", "Key Vault", "Blob Storage", "Managed identity"] },
            { label: "SDKs", items: ["mssql", "@azure/identity", "@azure/keyvault-secrets", "@azure/storage-blob"] },
            { label: "Delivery", items: ["GitHub Actions", "azure/webapps-deploy", "Git"] },
          ]}
        />
      </CaseSection>

      <NextProject project={next} />
    </>
  );
}
