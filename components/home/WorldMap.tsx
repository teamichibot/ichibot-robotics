'use client'

import { useEffect, useRef } from 'react'

type Destination = { country_name: string; latitude: number; longitude: number }

const ORIGIN = { lng: 110.37, lat: -7.8 }

export default function WorldMap({ destinations }: { destinations: Destination[] }) {
  const svgRef = useRef<SVGSVGElement>(null)

  useEffect(() => {
    if (!svgRef.current || !destinations.length) return

    let d3: typeof import('d3') | null = null
    let topo: typeof import('topojson-client') | null = null

    const load = async () => {
      const [d3m, topom, world] = await Promise.all([
        import('d3'),
        import('topojson-client'),
        fetch('https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json').then(r => r.json()),
      ])
      d3 = d3m; topo = topom

      const svg = d3.select(svgRef.current!)
      const W = svgRef.current!.clientWidth || 900
      const H = 420

      svg.attr('viewBox', `0 0 ${W} ${H}`).attr('width', '100%').attr('height', H)

      const proj = d3.geoNaturalEarth1()
        .scale(W / 6.5)
        .translate([W / 2, H / 2])

      const path = d3.geoPath().projection(proj)

      // Background
      svg.append('rect').attr('width', W).attr('height', H).attr('fill', 'transparent')

      // Graticule
      svg.append('path')
        .datum(d3.geoGraticule()())
        .attr('d', path as never)
        .attr('fill', 'none')
        .attr('stroke', 'rgba(255,255,255,0.04)')
        .attr('stroke-width', 0.5)

      // Countries
      const countries = (topo.feature(world, world.objects.countries) as unknown as { features: GeoJSON.Feature[] }).features
      svg.selectAll('.country')
        .data(countries)
        .join('path')
        .attr('class', 'country')
        .attr('d', path as never)
        .attr('fill', 'rgba(255,255,255,0.05)')
        .attr('stroke', 'rgba(255,255,255,0.08)')
        .attr('stroke-width', 0.4)

      const originPx = proj([ORIGIN.lng, ORIGIN.lat])!

      // Arcs + destination dots
      destinations.forEach((dest, i) => {
        const destPx = proj([dest.longitude, dest.latitude])
        if (!destPx) return

        // Quadratic bezier control point
        const mx = (originPx[0] + destPx[0]) / 2
        const my = (originPx[1] + destPx[1]) / 2 - Math.abs(destPx[0] - originPx[0]) * 0.25

        const arcPath = `M ${originPx[0]},${originPx[1]} Q ${mx},${my} ${destPx[0]},${destPx[1]}`

        const pathEl = svg.append('path')
          .attr('d', arcPath)
          .attr('fill', 'none')
          .attr('stroke', 'rgba(220,30,30,0.35)')
          .attr('stroke-width', 1)
          .attr('stroke-dasharray', function() { return (this as SVGPathElement).getTotalLength() })
          .attr('stroke-dashoffset', function() { return (this as SVGPathElement).getTotalLength() })
          .style('animation', `arcDraw 1.2s ${0.1 * i}s ease forwards`)

        // Destination dot
        svg.append('circle')
          .attr('cx', destPx[0]).attr('cy', destPx[1]).attr('r', 3)
          .attr('fill', 'var(--accent-red)')
          .attr('opacity', 0)
          .style('animation', `fadeIn 0.4s ${0.1 * i + 1}s ease forwards`)

        // Pulse ring
        svg.append('circle')
          .attr('cx', destPx[0]).attr('cy', destPx[1]).attr('r', 6)
          .attr('fill', 'none').attr('stroke', 'var(--accent-red)').attr('stroke-width', 1)
          .attr('opacity', 0)
          .style('animation', `pulseDest 2s ${0.1 * i + 1}s ease-out infinite`)
      })

      // Origin dot
      svg.append('circle')
        .attr('cx', originPx[0]).attr('cy', originPx[1]).attr('r', 5)
        .attr('fill', 'var(--accent-red)')
      svg.append('circle')
        .attr('cx', originPx[0]).attr('cy', originPx[1]).attr('r', 12)
        .attr('fill', 'none').attr('stroke', 'var(--accent-red)').attr('stroke-width', 1.5)
        .style('animation', 'pulseOrigin 2s ease-out infinite')

      // Origin label
      svg.append('text')
        .attr('x', originPx[0] + 10).attr('y', originPx[1] - 8)
        .attr('fill', 'var(--text-secondary)').attr('font-size', 10)
        .text('Yogyakarta')
    }

    load().catch(console.error)
  }, [destinations])

  return (
    <>
      <style>{`
        @keyframes arcDraw { to { stroke-dashoffset: 0; } }
        @keyframes pulseDest { 0% { r: 4; opacity: 0.8; } 100% { r: 14; opacity: 0; } }
        @keyframes pulseOrigin { 0% { r: 8; opacity: 0.8; } 100% { r: 22; opacity: 0; } }
      `}</style>
      <svg ref={svgRef} style={{ width: '100%', overflow: 'visible' }} />
    </>
  )
}
