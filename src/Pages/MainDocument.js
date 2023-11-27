import React from "react";
// import image1 from './image1.png';

export default function MainDocument() {
  return (
    <div className="content">
      <h1>Crime Data Analysis for Safer Communities</h1>
      <br />

      <div>
        <ul style={{ textAlign: 'justify' }}>
          <li>
            <strong>”Crime Data Analysis for Safer Communities”</strong> a web-based application, is heavily influenced by the trends it observes in criminal activity data. The functionality and impact of the application depend on these recent advances. Initially, the application’s capacity to identify seasonal trends is important for fulfilling its goals. The application enables users to prepare for and respond to increased criminal activity during specific seasons or periods of the year by identifying how crime rates change throughout the years. In this case, if historical data shows that street crimes increase over the summer, police enforcement can use extra resources and public awareness efforts to successfully fight this seasonal trend.
          </li>
          <br />
          <li>
            Furthermore, complex trend queries enable users to look deeply into previous crime data, finding ongoing patterns that may prevent simple visualization. Users are provided with the resources required to carry out in-depth analyses of particular crime types or demographics over the years according to this performance. This skill is necessary when developing customized crime prevention measures. For instance, by carefully reviewing complicated trends, law enforcement organizations can identify and address the root causes of chronic criminal problems, resulting in more efficient and long-term solutions.
          </li>
          <br />
          <li>
            The application’s main function geographical analysis, allows users to identify crime hot-spots and learn about the geographic patterns of criminal activity. For both law enforcement and community members, having a geographical awareness is important. While law enforcement can carefully allocate resources to regions with a history of criminal activity, citizens can exercise caution when traveling through high-crime areas. With the primary goal of making communities safer, these geographical information translate into proactive measures and greater neighborhood safety. As a result, the trends discovered by this web-based application are more than just points of information; there are also important catalysts that promote smart decision-making, resource allocation, and community involvement, ultimately advancing the larger goal of boosting community safety and security.
          </li>
        </ul>
        <br />
      </div>

      <div>
        <strong>TREND 1: Evolving Crime Trends</strong>
        <ul style={{ textAlign: 'justify' }}>
          <li>The present crime trend involves analyzing and understanding the current state of criminal activity.</li>
          <li>It encompasses the types of crimes being committed, their frequency, and any patterns or changes that are evident in the most recent data.</li>
          <li>A stacked bar chart is used to illustrate the trend across multiple years. In this chart, each stack represents a distinct type of crime, with years mapped on the horizontal (x) axis and crime rates on the vertical (y) axis.</li>
        </ul>
            <br></br>
        <strong>TREND 2: Geographical Analysis of Safety and Security Trend</strong>
        <ul style={{ textAlign: 'justify' }}>
          <li>The present crime trend analysis involves examining recent criminal incidents in a specified geographic area.</li>
          <li>This analysis provides insights into safety and security dynamics, including crime rates, types, and patterns over the years. The customized approach empowers stakeholders to make data-driven decisions for enhancing public safety.</li>
          <li>A heat map is employed to depict the yearly trends, consisting of multiple boxes, each labeled with a specific year, and colored to indicate the severity or frequency of crimes occurring during that period.</li>
        </ul>
        <br></br>
        <strong>TREND 3: Day-wise Crime Analysis Trend</strong>
        <ul style={{ textAlign: 'justify' }}>
          <li>The crime trend analysis involves studying the historical patterns of criminal activity over an extended period, specifically on different days of the week.</li>
          <li>This detailed analysis helps identify temporal and situational patterns in crime rates, aiding law enforcement and policymakers in optimizing resources and strategies.</li>
          <li>A multi-line chart is utilized to illustrate trends across the years, featuring seven lines, each representing a day of the week, with time periods marked on the x-axis and crime rates on the y-axis.</li>
        </ul>
        <br></br>
        <strong>TREND 4: Season-Based Crime Analysis Trend</strong>
        <ul style={{ textAlign: 'justify' }}>
        <li>
          Crime trend analysis is the examination of how criminal activity has evolved over an extended period. In this context, it entails a comprehensive study of crime rates across various types of locations over multiple years during different seasons.
        </li>
        <li>
          This analysis helps identify spatial and temporal patterns in crime, enabling users to make informed decisions regarding safety and security.
        </li>
        <li>
          A Choropleth Map is employed to depict trends across years in various locations. The color intensity signifies the frequency of occurrences, and it includes a filter for selecting specific seasons.
        </li>
      </ul>
      <br></br>
      <strong>TREND 5: Dynamic Crime Analysis Trend </strong>
      <ul style={{ textAlign: 'justify' }}>
        <li>
          This analysis of crime trends involves a thorough investigation into how particular types of crimes have changed and developed over an extended period, with a specific focus on various time intervals.
        </li>
        <li>
          This analysis allows for a customized, in-depth exploration of crime rates in user-specified locations and crime types over time.
        </li>
        <li>
          A line chart is used to visualize the trend over the years. With time periods marked on the x-axis and crime rates on the y-axis.
        </li>
      </ul>
      <br></br>
      <strong>TREND 6: Police Sentiment Analysis Trend </strong>
      <ul style={{ textAlign: 'justify' }}>
        <li>
          This crime trend analysis involves the examination of historical patterns and changes in criminal activity over a period of time.
        </li>
        <li>
          It can provide valuable insights into the dynamics of crime, helping law enforcement, policymakers, and communities make informed decisions about safety and security.
        </li>
        <li>
          A multi-line chart is employed to display long-term trends. It features time periods on the X-axis and maps police sentiment scores on the Y-axis, with each line representing the sentiment score for a specific district throughout the duration.
        </li>
      </ul>
      </div>
    </div>
  );
}
