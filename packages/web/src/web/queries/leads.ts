import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { orpc } from "../lib/api";

export function useCreateLead() {
  return useMutation(orpc.leads.create.mutationOptions());
}

export function useLeads(password: string | null) {
  return useQuery({
    ...orpc.leads.list.queryOptions({ input: { password: password ?? "" } }),
    enabled: !!password,
    retry: false,
  });
}

export function useSetLeadStatus() {
  const qc = useQueryClient();
  return useMutation(
    orpc.leads.setStatus.mutationOptions({
      onSuccess: () => qc.invalidateQueries({ queryKey: orpc.leads.key() }),
    }),
  );
}
