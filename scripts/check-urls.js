import https from 'node:https';

const candidates = [
  // Books & Reading
  'photo-1497633762265-9d179a990aa6',
  'photo-1512820790803-83ca734da794',
  'photo-1544716278-ca5e3f4abd8c',
  'photo-1516979187457-637abb4f9353',
  'photo-1456513080510-7bf3a84b82f8',
  'photo-1544717305-2782549b5136',
  'photo-1524995997946-a1c2e315a42f',
  'photo-1543002588-bfa74002ed7e',
  'photo-1516627145497-ae6968895b74',
  'photo-1476275466078-4007374efbbe',
  'photo-1502086223501-7ea6ecd79368',
  'photo-1544717302-de2939b7ef71',
  'photo-1503676260728-1c00da094a0b',
  'photo-1509062522246-3755977927d7',
  'photo-1532012164546-f432f2e3777f',
  'photo-1521714161819-15534968fc5f',
  'photo-1495446815901-a7297e633e8d',
  'photo-1491841573634-28140fc7ced7',
  'photo-1589829085413-56de8ae18c73',
  'photo-1519817650390-64a93db51149',
  'photo-1606326608606-aa0b62935f2b',
  // School Bags
  'photo-1581605405669-fcdf81165afa',
  'photo-1622560480605-d83c853bc5c3',
  'photo-1546938576-6e6a64f317cc',
  'photo-1553062407-98eeb64c6a62',
  'photo-1577733966973-d680bffd2e80',
  'photo-1590874103328-eac38a683ce7',
  'photo-1607604276583-eef5d076aa5f',
  'photo-1588850561407-ed78c282e89b',
  'photo-1509773894068-7d6308456e5e',
  // Lunch Boxes & Bottles
  'photo-1726726192151-6d4139ff229d',
  'photo-1602143407151-7111542de6e8',
  'photo-1523362628745-0c100150b504',
  'photo-1584269600464-37b1b58a9fe7',
  'photo-1570831739427-442b4d0bc4f4',
  'photo-1550989460-0adf9ea622e2',
  'photo-1576867757603-05b134ebc379',
  'photo-1589302168068-964664d93dc0',
  'photo-1627042633145-b780d842ba45',
  // Educational Toys
  'photo-1575364289437-fb1479d52732',
  'photo-1596461404969-9ae70f2830c1',
  'photo-1587654780291-39c9404d746b',
  'photo-1515488042361-ee00e0ddd4e4',
  'photo-1560421683-680b9c814e52',
  'photo-1515041219749-89347f83291a',
  'photo-1618005182384-a83a8bd57fbe',
  'photo-1581092160607-ee22621dd758',
  'photo-1558060370-d644479cb6f7',
  'photo-1584697964190-705b11c683c3',
  'photo-1566140967404-b8b393279a2a',
  // Stationery
  'photo-1577226223550-3ded0358e870',
  'photo-1585776245991-cf89dd7fc73a',
  'photo-1513542789411-b6a5d4f31634',
  'photo-1583485088034-697b5bc54ccd',
  'photo-1509228468518-180dd4864904',
  'photo-1456735190829-bb75b0004066',
  'photo-1585336261026-418664782bb5',
  'photo-1584697964403-1e5b1287e06a',
  'photo-1580582932707-520aed937b7b',
  // Gifts & Accessories
  'photo-1513885535751-8b9238bd345a',
  'photo-1549465220-1a8b9238cd48',
  'photo-1513519245088-0e12902e5a38',
  'photo-1569517282132-25d22f4573e6',
  'photo-1579783902614-a3fb3927b675',
  'photo-1512909006721-3d6018887383',
  'photo-1543257580-7269da773bf5'
];

async function check(id) {
  return new Promise((resolve) => {
    const req = https.request({
      hostname: 'images.unsplash.com',
      path: '/' + id + '?auto=format&fit=crop&q=80&w=800',
      method: 'HEAD',
      timeout: 5000
    }, (res) => {
      resolve({ id, status: res.statusCode });
    });
    req.on('error', (e) => resolve({ id, error: e.message }));
    req.on('timeout', () => { req.destroy(); resolve({ id, error: 'timeout' }); });
    req.end();
  });
}

const results = await Promise.all(candidates.map(check));
const failed = results.filter(r => r.status !== 200);
console.log(`Verified ${results.length} URLs. Failures: ${failed.length}`);
if (failed.length > 0) {
  console.log('Failed:', failed);
} else {
  console.log('ALL CANDIDATES 200 OK!');
}
