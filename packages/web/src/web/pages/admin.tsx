import { useState } from "react";
import { Loader2, Phone } from "lucide-react";
import { useLeads, useSetLeadStatus } from "../queries/leads";
import { AdminAttendance } from "../components/admin-attendance";

const KEY = "yoga180-admin";

function digits(p: string | null) {
  const d = (p ?? "").replace(/\D/g, "");
  if (!d) return null;
  return d.length === 10 ? `1${d}` : d;
}

export default function AdminPage() {
  const [password, setPassword] = useState<string | null>(() => sessionStorage.getItem(KEY));
  const [input, setInput] = useState("");
  const leads = useLeads(password);
  const setStatus = useSetLeadStatus();

  if (!password || leads.isError) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-soft p-6">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            sessionStorage.setItem(KEY, input);
            setPassword(input);
          }}
          className="w-full max-w-sm border border-ink bg-white p-8"
        >
          <p className="label text-mid">Yoga180</p>
          <h1 className="mt-3 text-2xl font-bold">Studio admin</h1>
          <input
            type="password"
            className="field mt-6"
            placeholder="Password"
            aria-label="Password"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          {leads.isError && <p className="mt-3 text-sm text-red-700">Wrong password.</p>}
          <button className="btn btn-primary mt-6 w-full">Open</button>
        </form>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-soft py-12">
      <div className="wrap max-w-4xl">
        <div className="flex items-end justify-between border-b border-ink pb-6">
          <div>
            <p className="label text-mid">Yoga180</p>
            <h1 className="mt-2 text-4xl font-bold">Studio admin</h1>
          </div>
          <button
            className="label text-mid hover:text-ink"
            onClick={() => {
              sessionStorage.removeItem(KEY);
              setPassword(null);
            }}
          >
            Log out
          </button>
        </div>
        {!leads.isLoading && <AdminAttendance />}
        <h2 className="text-2xl font-bold">Leads inbox</h2>
        {leads.isLoading ? (
          <div className="flex justify-center py-20">
            <Loader2 className="animate-spin text-mid" />
          </div>
        ) : !leads.data?.length ? (
          <p className="py-20 text-center text-mid">No leads yet.</p>
        ) : (
          <div className="mt-6 space-y-3">
            {leads.data.map((l) => {
              const d = digits(l.phone);
              return (
                <div key={l.id} className={`border bg-white p-5 ${l.status === "new" ? "border-teal" : "border-hair"}`}>
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <span className={`label px-2 py-1 ${l.type === "booking" ? "bg-ink text-white" : "bg-soft"}`}>
                        {l.type === "booking" ? "Book a call" : "Chat"}
                      </span>
                      <span className="font-semibold">{l.name}</span>
                    </div>
                    <span className="text-[13px] text-mid">{new Date(l.createdAt).toLocaleString()}</span>
                  </div>
                  <div className="mt-3 space-y-1 text-[14px] text-mid">
                    {l.phone && <p>Phone: {l.phone}</p>}
                    {l.classType && <p>Class: {l.classType}</p>}
                    {(l.preferredDay || l.preferredTime) && (
                      <p>
                        Preferred: {l.preferredDay} {l.preferredTime && `· ${l.preferredTime}`}
                      </p>
                    )}
                    {l.message && <p className="whitespace-pre-wrap text-ink">{l.message}</p>}
                  </div>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {l.phone && (
                      <a href={`tel:${l.phone}`} className="btn btn-ghost-dark h-9 px-4">
                        <Phone size={13} /> Call
                      </a>
                    )}
                    {d && (
                      <a
                        href={`https://wa.me/${d}?text=${encodeURIComponent(`Hi ${l.name.split(" ")[0]}, this is Asha from Yoga180!`)}`}
                        target="_blank"
                        rel="noreferrer"
                        className="btn btn-ghost-dark h-9 px-4"
                      >
                        WhatsApp
                      </a>
                    )}
                    <button
                      disabled={setStatus.isPending}
                      onClick={() =>
                        setStatus.mutate({
                          password,
                          id: l.id,
                          status: l.status === "new" ? "contacted" : "new",
                        })
                      }
                      className={`btn h-9 px-4 ${l.status === "new" ? "btn-primary" : "btn-ghost-dark"}`}
                    >
                      {l.status === "new" ? "Mark contacted" : "Mark new"}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
