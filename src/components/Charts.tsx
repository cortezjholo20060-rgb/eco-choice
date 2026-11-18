"use client";

import { Bar, BarChart, CartesianGrid, Cell, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { sdgs } from "@/data/sdgs";

export function CategoryChart({ data }: { data: { name: string; count: number }[] }) {
  return (
    <div>
      <div className="h-[340px] w-full" aria-hidden="true">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} layout="vertical" margin={{ left: 0, right: 16, top: 8, bottom: 8 }}>
            <CartesianGrid strokeDasharray="3 3" horizontal={false} />
            <XAxis type="number" allowDecimals={false} />
            <YAxis type="category" dataKey="name" width={118} tick={{ fontSize: 11 }} tickFormatter={(v: string) => (v.length > 18 ? `${v.slice(0, 17)}…` : v)} />
            <Tooltip />
            <Bar dataKey="count" name="Pledges" fill="#3C8D5A" radius={[0, 6, 6, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
      <table className="sr-only">
        <caption>Approved pledges by action category</caption>
        <thead><tr><th>Category</th><th>Pledges</th></tr></thead>
        <tbody>{data.map((d) => <tr key={d.name}><td>{d.name}</td><td>{d.count}</td></tr>)}</tbody>
      </table>
    </div>
  );
}

export function SdgChart({ data }: { data: { sdg: number; count: number }[] }) {
  return (
    <div>
      <div className="h-[300px] w-full" aria-hidden="true">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ left: -16, right: 8, top: 8, bottom: 8 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis dataKey="sdg" tick={{ fontSize: 11 }} interval={0} />
            <YAxis allowDecimals={false} />
            <Tooltip labelFormatter={(l) => `SDG ${l}`} />
            <Bar dataKey="count" name="Times selected" radius={[6, 6, 0, 0]}>
              {data.map((d) => <Cell key={d.sdg} fill={sdgs[d.sdg - 1].color} />)}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
      <table className="sr-only">
        <caption>Times each SDG was selected in approved pledges</caption>
        <thead><tr><th>SDG</th><th>Times selected</th></tr></thead>
        <tbody>{data.map((d) => <tr key={d.sdg}><td>SDG {d.sdg}</td><td>{d.count}</td></tr>)}</tbody>
      </table>
    </div>
  );
}
