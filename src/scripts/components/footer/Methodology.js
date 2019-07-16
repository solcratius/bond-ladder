import React from 'react';

const Methodology = () => (
  <div className="methodology grid-x">
    <div className="cell medium-8">
      <h4>Methodology</h4>
      <h6>Current Year BulletShares Yield Calculations</h6>
      <h6>BulletShares Corporate Bond ETFs</h6>
      <p>
        During the final six months of the year of maturity, bonds held within a
        BulletShares Corporate Bond ETF will mature and proceeds will be
        reinvested in cash and cash equivalents causing the ETF’s yield to
        decrease. An adjustment for this decrease is not included in the yield
        values shown above as standard yield calculations represent a point in
        time weighted average of each underlying portfolio constituent.
      </p>
      <h6>BulletShares High Yield Corporate Bond ETFs</h6>
      <p>
        During the year of maturity, bonds held within a BulletShares High Yield
        Corporate Bond ETF will mature and proceeds will be reinvested in cash
        and cash equivalents causing the ETF’s yield to decrease. An adjustment
        for this decrease is not included in the yield values shown above as
        standard yield calculations represent a point in time weighted average
        of each underlying portfolio constituent.
      </p>
      <h6>Criteria</h6>
      <p>
        To use the BulletShares ETF Bond Ladder Tool effectively, consider the
        explanatory notes listed below:
      </p>
      <ol>
        <li>
          The following characteristics are as of the business day listed on the
          data table
          <ul>
            <li>
              Yield to Maturity: This is the discount rate that calculates the
              present value of a bond’s anticipated cash flows with its market
              price (including accrued interest). A fund’s Average YTM is
              defined as the weighted average of a fund’s individual bond
              holding YTMs and is based upon Net Asset Value (“NAV”). This does
              not include fees and expenses.
            </li>
            <li>
              Yield to Worst: This uses the lowest discount rate for all
              possible redemption date scenarios with its market price. A fund’s
              Average YTW is defined as the weighted average of a fund’s
              individual bond holding YTWs and is based upon the price of each
              individual bond that was utilized to calculate that day’s net
              asset value and does not include fund fees and expenses.
            </li>
            <li>
              30-Day SEC Yield: This yield figure reflects the theoretical
              income that a portfolio would generate, including dividends and
              interest, during the period after deducting a fund’s expenses for
              the period. A fund’s actual net earnings for a given period under
              generally accepted accounting principles may differ from this
              standardized yield.
            </li>
            <li>
              Distribution Rate: The annualized rate an investor would receive
              if the most recent fund distribution stayed the same going
              forward. This rate does not represent the total return of a fund.
              The distribution rate is calculated by annualizing the most recent
              distribution and dividing by a fund’s NAV from the as-of-date.
            </li>
            <li>
              Effective Duration: The duration measures the sensitivity of the
              price (value of principal) of a fixed income investment to a
              change in interest rates. The larger the duration number, the
              greater the interest rate risk for bond prices.
            </li>
            <li>
              # of holdings: Number of bonds held by BulletShares ETFs included
              in current ladder.
            </li>
          </ul>
          <p>
            Note: Net asset value data is based on daily data and Weighted
            Average Yield to worst data is based on weekly data.
          </p>
        </li>
        <li>
          The BulletShares ETF Bond Ladder Tool utilizes data provided by the
          Bank of New York Mellon and the Blackrock Aladdin System. Invesco is
          not affiliated with the Bank of New York Mellon or BlackRock.
        </li>
        <li>
          The BulletShares ETF Bond Ladder Tool does not allow for direct
          purchase of the portfolio and does not take into consideration any
          commission or spread an investor may incur when transacting in the
          BulletShares ETFs.
        </li>
        <li>
          The BulletShares ETF Bond Ladder Tool does not take into account fees
          associated with purchases shares of BulletShares ETFs.
        </li>
        <li>
          Fund data is subject to change on a daily basis. The estimates
          presented do not represent the results that any particular investor
          actually attained. The information presented is based, in part, on
          selections entered by the user. No representation or warranty is made
          as to the reasonableness of the selection made. Estimated results have
          many inherent limitations and no representation is made that any
          investment will or is likely to characteristics similar to those shown
          in the scenarios. Actual results may differ, and may differ
          substantially, from the estimates. Changes in the assumptions may have
          a material impact on the hypothetical results presented.
        </li>
        <li>
          Although Invesco believes the information contained herein is
          reliable, it cannot, and does not, guarantee or warrant its
          completeness or suitability for any purpose. This information is
          provided for informational purposes only. The contents are neither
          designed nor intended and should not be considered as, or relied upon
          as, investment, legal, tax or accounting advice or as a recommendation
          of any specific security, product or strategy. Readers should consult
          their own advisors before deciding what, if any, course of action to
          take for their own particular situation.
        </li>
      </ol>
    </div>
  </div>
);

export default Methodology;
